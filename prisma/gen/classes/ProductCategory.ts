import { _Product } from './Product'
import { Prisma, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _ProductCategory extends PrismaClass {
	static prisma: Prisma.ProductCategoryDelegate<undefined>
	get prisma(): Prisma.ProductCategoryDelegate<undefined> {
		return _ProductCategory.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		depth: number = 0,
		filter?: {
			products?: boolean | Parameters<typeof _Product.getIncludes>[1]
		},
	): Prisma.ProductCategoryInclude {
		if (filter === undefined) {
			if (depth <= 0) {
				return {
					products: true,
				}
			}
			return {
				products: { include: _Product.getIncludes(depth - 1) },
			}
		} else {
			if (depth <= 0) {
				return {
					products: Object.keys(filter).includes('products')
						? true
						: undefined,
				}
			}
			return {
				products: Object.keys(filter).includes('products')
					? {
							include: _Product.getIncludes(
								depth - 1,
								typeof filter.products === 'boolean'
									? undefined
									: filter.products,
							),
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

	category_name?: string

	category_slug?: string

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
	}

	constructor(obj: {
		id?: number
		category_name?: string
		category_slug?: string

		products?: _Product[] | Product[] | RelationMany<_Product>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _ProductCategory>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.category_name = obj.category_name
		this.category_slug = obj.category_slug

		if (!obj.products || obj.products.length === 0) {
			this.products = new RelationMany<_Product>([])
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

	update(obj: {
		id?: number
		category_name?: string
		category_slug?: string
	}) {
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
		includes: boolean = true,
	): Promise<_ProductCategory | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _ProductCategory.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _ProductCategory.getIncludes()
			}
		}

		const dbQuery = await _ProductCategory.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _ProductCategory(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _ProductCategory.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _ProductCategory.getIncludes(depth),
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
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.category_name === undefined) {
			throw new Error(
				'Missing field on _ProductCategory.save(): category_name',
			)
		}
		if (this.category_slug === undefined) {
			throw new Error(
				'Missing field on _ProductCategory.save(): category_slug',
			)
		}
	}

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
