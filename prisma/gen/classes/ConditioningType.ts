import { _Product } from './Product'
import { Prisma, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _ConditioningTypeConstructor = {
	id?: number
	label: string
	products?: _Product[] | Product[] | RelationMany<_Product>
}

export class _ConditioningType implements PrismaClass {
	static prisma: Prisma.ConditioningTypeDelegate<undefined>
	get prisma(): Prisma.ConditioningTypeDelegate<undefined> {
		return _ConditioningType.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static async initList() {
		if (this.enumList === null) {
			return
		}

		const models = await this.prisma.findMany()
		this.enumList = []
		for (const model of models) {
			this.enumList.push(new _ConditioningType(model))
		}
	}

	private static enumList: _ConditioningType[]
	static get list(): _ConditioningType[] {
		return this.enumList
	}

	static getIncludes(
		param?:
			| number
			| {
					products?:
						| boolean
						| Exclude<
								Parameters<typeof _Product.getIncludes>[0],
								number
						  >
			  },
	): Prisma.ConditioningTypeInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					products: true,
				}
			}
			return {
				products: { include: _Product.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			return {
				products: Object.keys(param).includes('products')
					? typeof param.products === 'boolean'
						? true
						: {
								include: _Product.getIncludes(param.products),
						  }
					: undefined,
			}
		}
	}

	// ID
	private _id: number = -1
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	label: string

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
	}

	constructor(obj: _ConditioningTypeConstructor) {
		this.init(obj)
	}

	private init(obj: _ConditioningTypeConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.label = obj.label

		if (!obj.products || obj.products.length === 0) {
			this.products = new RelationMany<_Product>()
		} else if (obj.products instanceof RelationMany) {
			this.products = obj.products
		} else if (obj.products[0] instanceof _Product) {
			this.products = new RelationMany<_Product>(
				obj.products as _Product[],
			)
		} else {
			const productsArray: _Product[] = []
			for (const value of obj.products as Product[]) {
				productsArray.push(new _Product(value))
			}
			this.products = new RelationMany<_Product>(productsArray)
		}
	}

	update(obj: { label?: string }) {
		if (obj.label !== undefined) {
			this.label = obj.label
		}
	}

	toJSON() {
		return { id: this.id, label: this.label, products: this.products }
	}
	nonRelationsToJSON() {
		return { id: this.id!, label: this.label! }
	}

	static async all(
		query?: Prisma.ConditioningTypeFindFirstArgsBase,
	): Promise<_ConditioningType[]> {
		const models = await _ConditioningType.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _ConditioningType(m))
			return acc
		}, [] as _ConditioningType[])
	}

	static async from(
		query?: Prisma.ConditioningTypeFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_ConditioningType | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _ConditioningType.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _ConditioningType.getIncludes()
			}
		}

		const dbQuery = await _ConditioningType.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _ConditioningType(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _ConditioningType.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<
					Parameters<typeof _ConditioningType.getIncludes>[0],
					number
			  >,
	): Promise<void> {
		if (param === undefined) {
			param = 0
		}

		if (
			(typeof param === 'number' && param < 0) ||
			(typeof param === 'object' && Object.keys(param).length === 0)
		) {
			return
		}

		if (this.id !== -1) {
			const dbThis = await _ConditioningType.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _ConditioningType.getIncludes(param),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })
			}
		}
	}

	async save(): Promise<boolean> {
		try {
			await this.prismaClient.$transaction(
				async (tx): Promise<number> => {
					const saveYield = this.saveToTransaction(tx)
					await saveYield.next()
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	private _saving: boolean = false
	get saving(): boolean {
		return this._saving
	}
	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		this._saving = true

		this.checkRequiredFields()

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// Relations toOne

		// Relations toMany
		const productsYield = this.products!.saveToTransaction(tx)
		await productsYield.next()
		saveYieldsArray.push(productsYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.conditioningType.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.conditioningType.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.label === undefined) {
			throw new Error('Missing field on _ConditioningType.save(): label')
		}

		if (this.products.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _ConditioningType. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _ConditioningType.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _ConditioningType.prisma.deleteMany(query)).count
		} catch (e) {
			console.log(e)
			return false
		}
		return count
	}

	async delete(): Promise<boolean> {
		if (this.primaryKey === -1) return false

		try {
			await this.prisma.delete({
				where: { id: this._id },
			})
			this._id = -1
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}
}
