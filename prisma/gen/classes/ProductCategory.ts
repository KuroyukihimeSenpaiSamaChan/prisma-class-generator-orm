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

	static getIncludes(deep: number = 0): Prisma.ProductCategoryInclude {
		if (deep <= 0) {
			return {
				products: true,
			}
		}

		return {
			products: { include: _Product.getIncludes(deep - 1) },
		}
	}

	// ID
	private _id: number
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

	toJSON() {
		return {
			id: this.id,
			category_name: this.category_name,
			category_slug: this.category_slug,
			products: this.products,
		}
	}

	static async all(
		query: Prisma.ProductCategoryFindFirstArgsBase,
	): Promise<_ProductCategory[]> {
		const models = await _ProductCategory.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _ProductCategory(m))
			return acc
		}, [] as _ProductCategory[])
	}

	static async from<F extends Prisma.ProductCategoryWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.ProductCategoryFindUniqueArgsBase, 'where'>,
	): Promise<_ProductCategory | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _ProductCategory.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _ProductCategory.getIncludes()
		}

		const dbQuery = await _ProductCategory.prisma.findFirst({
			where: where,
			...opt,
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
					console.log('First YIELD')
					await saveYield.next()
					console.log('Second YIELD')
					return (await saveYield.next()).value
				},
			)
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}

	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		//
		if (this.id === undefined) {
			throw new Error('Invalid field on _ProductCategory.save(): id')
		}

		if (this.category_name === undefined) {
			throw new Error(
				'Invalid field on _ProductCategory.save(): category_name',
			)
		}

		if (this.category_slug === undefined) {
			throw new Error(
				'Invalid field on _ProductCategory.save(): category_slug',
			)
		}

		if (this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on _ProductCategory. Save it first, then add the toMany fields",
			)
		}

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// toOne
		// if (this.media !== null && typeof this.media !== 'number') {
		//   const mediaYield = this.media.saveToTransaction(tx)
		//   await mediaYield.next()
		//   saveYieldsArray.push(mediaYield)
		// }

		// toMany
		// const galleryYield = this.gallery.saveToTransaction(tx)
		// galleryYield.next()
		// saveYieldsArray.push(galleryYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			saveYield.next()
		}

		return new Promise<number>((resolve) => resolve(1))
	}
}
