import { _Product } from './Product'
import { Prisma, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _ProductVisibilty implements PrismaClass {
	static prisma: Prisma.ProductVisibiltyDelegate<undefined>
	get prisma(): Prisma.ProductVisibiltyDelegate<undefined> {
		return _ProductVisibilty.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.ProductVisibiltyInclude {
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
	id: number = -1

	visibility?: string = 'a'

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
	}

	constructor(obj: {
		id?: number
		visibility?: string

		products?: _Product[] | Product[] | RelationMany<_Product>
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _ProductVisibilty>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
		}
		this.visibility = obj.visibility

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
			visibility: this.visibility,
			products: this.products,
		}
	}

	static async all(
		query: Prisma.ProductVisibiltyFindFirstArgsBase,
	): Promise<_ProductVisibilty[]> {
		const models = await _ProductVisibilty.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _ProductVisibilty(m))
			return acc
		}, [] as _ProductVisibilty[])
	}

	static async from<F extends Prisma.ProductVisibiltyWhereInput>(
		where: F,
		opt?: Omit<Prisma.ProductVisibiltyFindFirstArgsBase, 'where'>,
	): Promise<_ProductVisibilty | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _ProductVisibilty.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _ProductVisibilty.getIncludes()
		}

		const dbQuery = await _ProductVisibilty.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _ProductVisibilty(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _ProductVisibilty.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _ProductVisibilty.getIncludes(depth),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })
			}
		}
	}

	async save(): Promise<boolean> {
		try {
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}
}
