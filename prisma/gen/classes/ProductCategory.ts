import { _Product } from './Product'
import { Prisma, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _ProductCategoryConstructor = {
	id?: number
	category_name: string
	category_slug: string
	products?: _Product[] | Product[] | RelationMany<_Product>
}

export class _ProductCategory implements PrismaClass {
	static prisma: Prisma.ProductCategoryDelegate<undefined>
	get prisma(): Prisma.ProductCategoryDelegate<undefined> {
		return _ProductCategory.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	private _isSaved = false
	get isSaved(): boolean {
		return this._isSaved
	}

	static async initList() {
		if (this.enumList === null) {
			return
		}

		this.enumList = await this.all()
	}

	private static enumList: _ProductCategory[]
	static get list(): _ProductCategory[] {
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
	): Prisma.ProductCategoryInclude {
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

			const query = {
				products: Object.keys(param).includes('products')
					? typeof param.products === 'boolean'
						? true
						: {
								include: _Product.getIncludes(param.products),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) =>
					query[key as keyof typeof query] === undefined &&
					delete query[key as keyof typeof query],
			)

			return query
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

	private _category_name: string
	set category_name(value: string) {
		this._category_name = value
		this._isSaved = false
	}

	private _category_slug: string
	set category_slug(value: string) {
		this._category_slug = value
		this._isSaved = false
	}

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
		this._isSaved = false
	}

	constructor(obj: _ProductCategoryConstructor) {
		this.init(obj)
	}

	private init(obj: _ProductCategoryConstructor) {
		this._category_name = obj.category_name
		this._category_slug = obj.category_slug

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

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: { category_name?: string; category_slug?: string }) {
		if (obj.category_name !== undefined) {
			this.category_name = obj.category_name
		}
		if (obj.category_slug !== undefined) {
			this.category_slug = obj.category_slug
		}
	}

	toJSON() {
		return {
			id: this.id,
			category_name: this.category_name,
			category_slug: this.category_slug,
			products: this.products,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			category_name: this.category_name!,
			category_slug: this.category_slug!,
		}
	}

	static async all(
		query?: Prisma.ProductCategoryFindFirstArgsBase,
	): Promise<_ProductCategory[]> {
		const models = await _ProductCategory.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _ProductCategory(m))
			return acc
		}, [] as _ProductCategory[])
	}

	static async from(
		query?: Prisma.ProductCategoryFindFirstArgsBase,
	): Promise<_ProductCategory | null> {
		const dbQuery = await _ProductCategory.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _ProductCategory(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _ProductCategory.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<
					Parameters<typeof _ProductCategory.getIncludes>[0],
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
			const dbThis = await _ProductCategory.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _ProductCategory.getIncludes(param),
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

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._isSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
		}

		const productsConnections: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> =
			[]
		for (const relation of this.products) {
			productsConnections.push({
				id: relation.primaryKey,
			})
		}
		const productsDisconnections: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> =
			[]
		for (const relation of this.products.toRemoveRelations) {
			productsConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.productCategory.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						products: {
							connect: productsConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.productCategory.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					products: {
						connect: productsConnections,
						disconnect: productsDisconnections,
					},
				},
			})
		}

		this._saving = false
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {}

	static async deleteAll(
		query: Parameters<typeof _ProductCategory.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _ProductCategory.prisma.deleteMany(query)).count
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
