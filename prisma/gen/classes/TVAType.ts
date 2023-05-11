import { _Product } from './Product'
import { _SubOrder } from './SubOrder'
import { Prisma, Product, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _TVATypeConstructor = {
	id?: number
	slug: string
	amount?: number
	products?: _Product[] | Product[] | RelationMany<_Product>
	sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
}

export class _TVAType implements PrismaClass {
	static prisma: Prisma.TVATypeDelegate<undefined>
	get prisma(): Prisma.TVATypeDelegate<undefined> {
		return _TVAType.prisma
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

	private static enumList: _TVAType[]
	static get list(): _TVAType[] {
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
					sub_orders?:
						| boolean
						| Exclude<
								Parameters<typeof _SubOrder.getIncludes>[0],
								number
						  >
			  },
	): Prisma.TVATypeInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					products: true,
					sub_orders: true,
				}
			}
			return {
				products: { include: _Product.getIncludes(param - 1) },
				sub_orders: { include: _SubOrder.getIncludes(param - 1) },
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
				sub_orders: Object.keys(param).includes('sub_orders')
					? typeof param.sub_orders === 'boolean'
						? true
						: {
								include: _SubOrder.getIncludes(
									param.sub_orders,
								),
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

	private _slug: string
	set slug(value: string) {
		this._slug = value
		this._isSaved = false
	}

	private _amount: number = 0
	set amount(value: number) {
		this._amount = value
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

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
		this._isSaved = false
	}

	constructor(obj: _TVATypeConstructor) {
		this.init(obj)
	}

	private init(obj: _TVATypeConstructor) {
		this._slug = obj.slug
		this._amount = obj.amount ?? 0

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

		if (!obj.sub_orders || obj.sub_orders.length === 0) {
			this.sub_orders = new RelationMany<_SubOrder>()
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

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: { slug?: string; amount?: number }) {
		if (obj.slug !== undefined) {
			this.slug = obj.slug
		}
		if (obj.amount !== undefined) {
			this.amount = obj.amount
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
	nonRelationsToJSON() {
		return { id: this.id!, slug: this.slug!, amount: this.amount! }
	}

	static async all(
		query?: Prisma.TVATypeFindFirstArgsBase,
	): Promise<_TVAType[]> {
		const models = await _TVAType.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _TVAType(m))
			return acc
		}, [] as _TVAType[])
	}

	static async from(
		query?: Prisma.TVATypeFindFirstArgsBase,
	): Promise<_TVAType | null> {
		const dbQuery = await _TVAType.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _TVAType(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _TVAType.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _TVAType.getIncludes>[0], number>,
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
			const dbThis = await _TVAType.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _TVAType.getIncludes(param),
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

		const sub_ordersYield = this.sub_orders!.saveToTransaction(tx)
		await sub_ordersYield.next()
		saveYieldsArray.push(sub_ordersYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._isSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
		}

		if (this._id === -1) {
			this._id = (
				await tx.tVAType.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.tVAType.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.products.length > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _TVAType. Save it first, then add the toMany fields",
			)
		}
		if (this.sub_orders.length > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _TVAType. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _TVAType.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _TVAType.prisma.deleteMany(query)).count
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
