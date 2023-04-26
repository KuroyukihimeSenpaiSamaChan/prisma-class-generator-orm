import { _Product } from './Product'
import { _SubOrder } from './SubOrder'
import { Prisma, Product, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _TVAType implements PrismaClass {
	static prisma: Prisma.TVATypeDelegate<undefined>
	get prisma(): Prisma.TVATypeDelegate<undefined> {
		return _TVAType.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.TVATypeInclude {
		if (deep <= 0) {
			return {
				products: true,
				sub_orders: true,
			}
		}

		return {
			products: { include: _Product.getIncludes(deep - 1) },
			sub_orders: { include: _SubOrder.getIncludes(deep - 1) },
		}
	}

	// ID
	id: number = -1

	slug?: string

	amount?: number = 0

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
	}

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	constructor(obj: {
		id?: number
		slug?: string
		amount?: number

		products?: _Product[] | Product[] | RelationMany<_Product>
		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _TVAType>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
		}
		this.slug = obj.slug
		this.amount = obj.amount

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

		if (!obj.sub_orders || obj.sub_orders.length === 0) {
			this.sub_orders = new RelationMany<_SubOrder>([])
		} else if (obj.sub_orders instanceof RelationMany) {
			this.sub_orders = obj.sub_orders
		} else if (obj.sub_orders[0] instanceof _SubOrder) {
			this.sub_orders = new RelationMany<_SubOrder>(
				obj.sub_orders as _SubOrder[],
			)
		} else {
			const sub_ordersArray: _SubOrder[] = []
			for (const value of obj.sub_orders as SubOrder[]) {
				sub_ordersArray.push(new _SubOrder(value))
			}
			this.sub_orders = new RelationMany<_SubOrder>(sub_ordersArray)
		}
	}

	toJSON() {
		return {
			id: this.id,
			slug: this.slug,
			amount: this.amount,
			products: this.products,
			sub_orders: this.sub_orders,
		}
	}

	static async all(
		query: Prisma.TVATypeFindFirstArgsBase,
	): Promise<_TVAType[]> {
		const models = await _TVAType.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _TVAType(m))
			return acc
		}, [] as _TVAType[])
	}

	static async from<F extends Prisma.TVATypeWhereInput>(
		where: F,
		opt?: Omit<Prisma.TVATypeFindFirstArgsBase, 'where'>,
	): Promise<_TVAType | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _TVAType.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _TVAType.getIncludes()
		}

		const dbQuery = await _TVAType.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _TVAType(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _TVAType.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _TVAType.getIncludes(depth),
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
