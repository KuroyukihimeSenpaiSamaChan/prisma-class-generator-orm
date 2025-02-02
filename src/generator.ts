import { GeneratorOptions } from '@prisma/generator-helper'
import { parseEnvValue } from '@prisma/internals'
import * as path from 'path'
import { GeneratorPathNotExists } from './error-handler'
import { PrismaConvertor } from './convertor'
import { parseBoolean, parseNumber } from './util'
import * as prettier from 'prettier'
import { FileComponent } from './components/file.component'
import { PrismaModelComponent } from './components/prismamodel.component'
import { PrismaDecoComponent } from './components/prismadeco.component'

export const GENERATOR_NAME = 'Prisma Class Generator'

export const PrismaClassGeneratorOptions = {
	dryRun: {
		desc: 'dry run',
		defaultValue: true,
	},
	separateRelationFields: {
		desc: 'separate relation fields',
		defaultValue: false,
	},
	useUndefinedDefault: {
		desc: 'use undefined default',
		defaultValue: false,
	},
} as const

export type PrismaClassGeneratorOptionsKeys =
	keyof typeof PrismaClassGeneratorOptions
export type PrismaClassGeneratorConfig = Partial<
	Record<PrismaClassGeneratorOptionsKeys, any>
>

export class PrismaClassGenerator {
	static instance: PrismaClassGenerator
	_options: GeneratorOptions
	_prettierOptions: prettier.Options
	rootPath: string
	clientPath: string

	constructor(options?: GeneratorOptions) {
		if (options) {
			this.options = options
		}
		const output = parseEnvValue(options.generator.output!)
		this.prettierOptions =
			prettier.resolveConfig.sync(output, { useCache: false }) ||
			prettier.resolveConfig.sync(path.dirname(require.main.filename), {
				useCache: false,
			})
	}

	public get options() {
		return this._options
	}

	public set options(value) {
		this._options = value
	}

	public get prettierOptions() {
		return this._prettierOptions
	}

	public set prettierOptions(value) {
		this._prettierOptions = value
	}

	static getInstance(options?: GeneratorOptions) {
		if (PrismaClassGenerator.instance) {
			return PrismaClassGenerator.instance
		}
		PrismaClassGenerator.instance = new PrismaClassGenerator(options)
		return PrismaClassGenerator.instance
	}

	getClientImportPath() {
		if (!this.rootPath || !this.clientPath) {
			throw new GeneratorPathNotExists()
		}
		let finalPath = path.relative(this.rootPath, this.clientPath)
		if (finalPath.includes('@prisma'))
			finalPath = finalPath.substring(finalPath.indexOf('@prisma'))
		return finalPath.replace('node_modules/', '')
	}

	setPrismaClientPath(): void {
		const { otherGenerators, schemaPath } = this.options

		this.rootPath = schemaPath.replace('/prisma/schema.prisma', '')
		const defaultPath = path.resolve(
			this.rootPath,
			'node_modules/@prisma/client',
		)
		const clientGenerator = otherGenerators.find(
			(g) => g.provider.value === 'prisma-client-js',
		)

		this.clientPath = clientGenerator?.output.value ?? defaultPath
	}

	run = async (): Promise<void> => {
		const { generator, dmmf } = this.options
		const output = parseEnvValue(generator.output!)
		const config = this.getConfig()
		this.setPrismaClientPath()

		const convertor = PrismaConvertor.getInstance()
		convertor.dmmf = dmmf
		convertor.config = config

		const classes = convertor.getClasses()
		const files = classes.map(
			(classComponent) => new FileComponent({ classComponent, output }),
		)

		const classToPath = files.reduce((result, fileRow) => {
			const fullPath = path.resolve(fileRow.dir, fileRow.filename)
			result[fileRow.prismaClass.name] = fullPath
			return result
		}, {} as Record<string, string>)

		files.forEach((fileRow) => {
			fileRow.imports = fileRow.imports.map((importRow) => {
				const pathToReplace = importRow.getReplacePath(classToPath)
				if (pathToReplace !== null) {
					importRow.from = fileRow.getRelativePath(pathToReplace)
				}
				return importRow
			})
		})

		files.push(new PrismaModelComponent(output, classes));
		// files.push(new PrismaDecoComponent(output));

		files.forEach((fileRow) => {
			fileRow.write(config.dryRun)
		})
		return
	}

	getConfig = (): PrismaClassGeneratorConfig => {
		const config = this.options.generator.config

		const result: PrismaClassGeneratorConfig = {}
		for (const optionName in PrismaClassGeneratorOptions) {
			const { defaultValue } = PrismaClassGeneratorOptions[optionName]
			result[optionName] = defaultValue

			const value = config[optionName]
			if (value) {
				if (typeof defaultValue === 'boolean') {
					result[optionName] = parseBoolean(value)
				} else if (typeof defaultValue === 'number') {
					result[optionName] = parseNumber(value)
				} else {
					result[optionName] = value
				}
			}
		}

		return result
	}
}
