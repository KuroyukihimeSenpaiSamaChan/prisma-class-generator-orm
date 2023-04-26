import { PRISMAMODEL_TEMPLATE } from '../templates/prismamodel.template'
import * as path from 'path'
import { FileComponent } from './file.component'
import { ClassComponent } from './class.component'

export class PrismaModelComponent extends FileComponent {
	classes: ClassComponent[]

	constructor(output: string, classes: ClassComponent[]) {
		super()
		this.dir = path.resolve(output)
		this.filename = 'prisma-model.ts'
		this.classes = classes
	}

	echo = () => {
		let classesImports = ''
		let classesInit = ''
		for (const classComp of this.classes) {
			classesImports += `import { _${classComp.name
				} } from './classes/${classComp.name}'
			`

			classesInit += `_${classComp.name
				}.prisma = PrismaModel.prismaClient.${classComp.name
					.toLowerCase()
					.substring(0, 1)}${classComp.name.substring(1)};
			`
		}

		return PRISMAMODEL_TEMPLATE.replaceAll(
			'!#{CLASSES_IMPORTS}',
			classesImports,
		).replaceAll('!#{CLASSES_INIT}', classesInit)
	}
}
