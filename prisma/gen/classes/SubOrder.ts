import { _Expedition } from './Expedition'
import { _Order } from './Order'
import { _Product } from './Product'
import { _User } from './User'
import { _TVAType } from './TVAType'
import {
	Prisma,
	Expedition,
	Order,
	Product,
	User,
	TVAType,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _SubOrder extends PrismaClass {
	static prisma: Prisma.SubOrderDelegate<undefined>
	get prisma(): Prisma.SubOrderDelegate<undefined> {
		return _SubOrder.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.SubOrderInclude {
		if (deep <= 0) {
			return {
				expedition: true,
				order: true,
				product: true,
				user: true,
				tva_type: true,
			}
		}

		return {
			expedition: { include: _Expedition.getIncludes(deep - 1) },
			order: { include: _Order.getIncludes(deep - 1) },
			product: { include: _Product.getIncludes(deep - 1) },
			user: { include: _User.getIncludes(deep - 1) },
			tva_type: { include: _TVAType.getIncludes(deep - 1) },
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

	private _order_id: ForeignKey

	private _vendor_id: ForeignKey

	private _expedition_id: ForeignKey

	private _product_id: ForeignKey

	product_price?: number

	quantity?: number

	private _taxe_id: ForeignKey = 1

	private _expedition: _Expedition | null
	get expedition(): _Expedition | ForeignKey {
		return this._expedition ? this._expedition : this.expedition_id
	}
	set expedition(value: _Expedition | ForeignKey) {
		if (value instanceof _Expedition) {
			this._expedition = value
			this._expedition_id = value.id
		} else {
			this._expedition = null
			this._expedition_id = value
		}
	}
	get expedition_id(): ForeignKey {
		if (this._expedition === null) {
			return this._expedition_id
		} else {
			return this._expedition.primaryKey
		}
	}

	private _order: _Order | null
	get order(): _Order | ForeignKey {
		return this._order ? this._order : this.order_id
	}
	set order(value: _Order | ForeignKey) {
		if (value instanceof _Order) {
			this._order = value
			this._order_id = value.id
		} else {
			this._order = null
			this._order_id = value
		}
	}
	get order_id(): ForeignKey {
		if (this._order === null) {
			return this._order_id
		} else {
			return this._order.primaryKey
		}
	}

	private _product: _Product | null
	get product(): _Product | ForeignKey {
		return this._product ? this._product : this.product_id
	}
	set product(value: _Product | ForeignKey) {
		if (value instanceof _Product) {
			this._product = value
			this._product_id = value.id
		} else {
			this._product = null
			this._product_id = value
		}
	}
	get product_id(): ForeignKey {
		if (this._product === null) {
			return this._product_id
		} else {
			return this._product.primaryKey
		}
	}

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.vendor_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this._vendor_id = value.id
		} else {
			this._user = null
			this._vendor_id = value
		}
	}
	get vendor_id(): ForeignKey {
		if (this._user === null) {
			return this._vendor_id
		} else {
			return this._user.primaryKey
		}
	}

	private _tva_type: _TVAType | null
	get tva_type(): _TVAType | ForeignKey {
		return this._tva_type ? this._tva_type : this.taxe_id
	}
	set tva_type(value: _TVAType | ForeignKey) {
		if (value instanceof _TVAType) {
			this._tva_type = value
			this._taxe_id = value.id
		} else {
			this._tva_type = null
			this._taxe_id = value
		}
	}
	get taxe_id(): ForeignKey {
		if (this._tva_type === null) {
			return this._taxe_id
		} else {
			return this._tva_type.primaryKey
		}
	}

	constructor(obj: {
		id?: number
		order_id?: ForeignKey
		vendor_id?: ForeignKey
		expedition_id?: ForeignKey
		product_id?: ForeignKey
		product_price?: number
		quantity?: number
		taxe_id?: ForeignKey
		expedition?: _Expedition | Expedition | ForeignKey
		order?: _Order | Order | ForeignKey
		product?: _Product | Product | ForeignKey
		user?: _User | User | ForeignKey
		tva_type?: _TVAType | TVAType | ForeignKey
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _SubOrder>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.product_price = obj.product_price
		this.quantity = obj.quantity

		if (!obj.expedition) {
			if (obj.expedition_id === undefined) {
				this.expedition = null
			} else {
				this.expedition = obj.expedition_id
			}
		} else if (obj.expedition instanceof _Expedition) {
			this.expedition = obj.expedition
		} else if (typeof obj.expedition === 'number') {
			this.expedition = obj.expedition
		} else {
			this.expedition = new _Expedition(obj.expedition)
		}

		if (!obj.order) {
			if (obj.order_id === undefined) {
				this.order = null
			} else {
				this.order = obj.order_id
			}
		} else if (obj.order instanceof _Order) {
			this.order = obj.order
		} else if (typeof obj.order === 'number') {
			this.order = obj.order
		} else {
			this.order = new _Order(obj.order)
		}

		if (!obj.product) {
			if (obj.product_id === undefined) {
				this.product = null
			} else {
				this.product = obj.product_id
			}
		} else if (obj.product instanceof _Product) {
			this.product = obj.product
		} else if (typeof obj.product === 'number') {
			this.product = obj.product
		} else {
			this.product = new _Product(obj.product)
		}

		if (!obj.user) {
			if (obj.vendor_id === undefined) {
				this.user = null
			} else {
				this.user = obj.vendor_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}

		if (!obj.tva_type) {
			if (obj.taxe_id === undefined) {
				this.tva_type = null
			} else {
				this.tva_type = obj.taxe_id
			}
		} else if (obj.tva_type instanceof _TVAType) {
			this.tva_type = obj.tva_type
		} else if (typeof obj.tva_type === 'number') {
			this.tva_type = obj.tva_type
		} else {
			this.tva_type = new _TVAType(obj.tva_type)
		}
	}

	update(obj: {
		id?: number
		order_id?: ForeignKey
		vendor_id?: ForeignKey
		expedition_id?: ForeignKey
		product_id?: ForeignKey
		product_price?: number
		quantity?: number
		taxe_id?: ForeignKey
	}) {
		if (obj.product_price !== undefined) {
			this.product_price = obj.product_price
		}
		if (obj.quantity !== undefined) {
			this.quantity = obj.quantity
		}
	}

	toJSON() {
		return {
			id: this.id,
			order_id: this.order_id,
			vendor_id: this.vendor_id,
			expedition_id: this.expedition_id,
			product_id: this.product_id,
			product_price: this.product_price,
			quantity: this.quantity,
			taxe_id: this.taxe_id,
			expedition: this.expedition,
			order: this.order,
			product: this.product,
			user: this.user,
			tva_type: this.tva_type,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			order_id: this.order_id!,
			vendor_id: this.vendor_id!,
			expedition_id: this.expedition_id!,
			product_id: this.product_id!,
			product_price: this.product_price!,
			quantity: this.quantity!,
			taxe_id: this.taxe_id!,
		}
	}

	static async all(
		query?: Prisma.SubOrderFindFirstArgsBase,
	): Promise<_SubOrder[]> {
		const models = await _SubOrder.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _SubOrder(m))
			return acc
		}, [] as _SubOrder[])
	}

	static async from(
		query?: Prisma.SubOrderFindFirstArgsBase,
	): Promise<_SubOrder | null> {
		if (query === undefined) {
			query = {
				include: _SubOrder.getIncludes(),
			}
		} else if (query.include === undefined && query.select === undefined) {
			query.include = _SubOrder.getIncludes()
		}

		const dbQuery = await _SubOrder.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _SubOrder(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _SubOrder.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _SubOrder.getIncludes(depth),
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

	async *saveToTransaction(
		tx: Parameters<Parameters<typeof this.prismaClient.$transaction>[0]>[0],
	) {
		this.checkRequiredFields()

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// Relations toOne
		if (typeof this.expedition !== 'number') {
			const expeditionYield = this.expedition!.saveToTransaction(tx)
			await expeditionYield.next()
			saveYieldsArray.push(expeditionYield)
		}

		if (typeof this.order !== 'number') {
			const orderYield = this.order!.saveToTransaction(tx)
			await orderYield.next()
			saveYieldsArray.push(orderYield)
		}

		if (typeof this.product !== 'number') {
			const productYield = this.product!.saveToTransaction(tx)
			await productYield.next()
			saveYieldsArray.push(productYield)
		}

		if (typeof this.user !== 'number') {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		if (typeof this.tva_type !== 'number') {
			const tva_typeYield = this.tva_type!.saveToTransaction(tx)
			await tva_typeYield.next()
			saveYieldsArray.push(tva_typeYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.subOrder.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.subOrder.update({
				where: { id: this._id },
				data: { ...this.nonRelationsToJSON() },
			})
		}

		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.product_price === undefined) {
			throw new Error('Missing field on _SubOrder.save(): product_price')
		}
		if (this.quantity === undefined) {
			throw new Error('Missing field on _SubOrder.save(): quantity')
		}

		if (this.expedition === undefined || this.expedition === null) {
			throw new Error(
				"expedition can't be null or undefined in _SubOrder.",
			)
		}
		if (this.order === undefined || this.order === null) {
			throw new Error("order can't be null or undefined in _SubOrder.")
		}
		if (this.product === undefined || this.product === null) {
			throw new Error("product can't be null or undefined in _SubOrder.")
		}
		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _SubOrder.")
		}
		if (this.tva_type === undefined || this.tva_type === null) {
			throw new Error("tva_type can't be null or undefined in _SubOrder.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _SubOrder.prisma.deleteMany>[0],
	): Promise<boolean> {
		try {
			_SubOrder.prisma.deleteMany(query)
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}

	async delete(): Promise<boolean> {
		if (this.primaryKey === -1) return false

		try {
			this.prisma.delete({
				where: { id: this._id },
			})
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}
}
