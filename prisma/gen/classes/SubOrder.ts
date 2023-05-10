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

type _SubOrderConstructor<
	expeditionType extends ForeignKey | undefined = ForeignKey | undefined,
	orderType extends ForeignKey | undefined = ForeignKey | undefined,
	productType extends ForeignKey | undefined = ForeignKey | undefined,
	userType extends ForeignKey | undefined = ForeignKey | undefined,
	tva_typeType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	product_price: number
	quantity: number
} & (expeditionType extends ForeignKey
	? {
			expedition_id: ForeignKey
			expedition?: Expedition | _Expedition
	  }
	: {
			expedition_id?: ForeignKey
			expedition: Expedition | _Expedition
	  }) &
	(orderType extends ForeignKey
		? {
				order_id: ForeignKey
				order?: Order | _Order
		  }
		: {
				order_id?: ForeignKey
				order: Order | _Order
		  }) &
	(productType extends ForeignKey
		? {
				product_id: ForeignKey
				product?: Product | _Product
		  }
		: {
				product_id?: ForeignKey
				product: Product | _Product
		  }) &
	(userType extends ForeignKey
		? {
				vendor_id: ForeignKey
				user?: User | _User
		  }
		: {
				vendor_id?: ForeignKey
				user: User | _User
		  }) &
	(tva_typeType extends ForeignKey
		? {
				tva_id: ForeignKey
				tva_type?: TVAType | _TVAType
		  }
		: {
				tva_id?: ForeignKey
				tva_type: TVAType | _TVAType
		  })

export class _SubOrder implements PrismaClass {
	static prisma: Prisma.SubOrderDelegate<undefined>
	get prisma(): Prisma.SubOrderDelegate<undefined> {
		return _SubOrder.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		param?:
			| number
			| {
					expedition?:
						| boolean
						| Exclude<
								Parameters<typeof _Expedition.getIncludes>[0],
								number
						  >
					order?:
						| boolean
						| Exclude<
								Parameters<typeof _Order.getIncludes>[0],
								number
						  >
					product?:
						| boolean
						| Exclude<
								Parameters<typeof _Product.getIncludes>[0],
								number
						  >
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
					tva_type?:
						| boolean
						| Exclude<
								Parameters<typeof _TVAType.getIncludes>[0],
								number
						  >
			  },
	): Prisma.SubOrderInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					expedition: true,
					order: true,
					product: true,
					user: true,
					tva_type: true,
				}
			}
			return {
				expedition: { include: _Expedition.getIncludes(param - 1) },
				order: { include: _Order.getIncludes(param - 1) },
				product: { include: _Product.getIncludes(param - 1) },
				user: { include: _User.getIncludes(param - 1) },
				tva_type: { include: _TVAType.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			return {
				expedition: Object.keys(param).includes('expedition')
					? typeof param.expedition === 'boolean'
						? true
						: {
								include: _Expedition.getIncludes(
									param.expedition,
								),
						  }
					: undefined,
				order: Object.keys(param).includes('order')
					? typeof param.order === 'boolean'
						? true
						: {
								include: _Order.getIncludes(param.order),
						  }
					: undefined,
				product: Object.keys(param).includes('product')
					? typeof param.product === 'boolean'
						? true
						: {
								include: _Product.getIncludes(param.product),
						  }
					: undefined,
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
				tva_type: Object.keys(param).includes('tva_type')
					? typeof param.tva_type === 'boolean'
						? true
						: {
								include: _TVAType.getIncludes(param.tva_type),
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

	private _order_id: ForeignKey

	private _vendor_id: ForeignKey

	private _expedition_id: ForeignKey

	private _product_id: ForeignKey

	product_price: number

	quantity: number

	private _tva_id: ForeignKey = 1

	private _expedition: _Expedition
	get expedition(): _Expedition {
		return this._expedition
	}
	set expedition(value: _Expedition) {
		this._expedition = value
		this._expedition_id = value.id
	}
	get expedition_id(): ForeignKey {
		if (!this._expedition) {
			return this._expedition_id
		} else {
			return this._expedition.primaryKey
		}
	}

	private _order: _Order
	get order(): _Order {
		return this._order
	}
	set order(value: _Order) {
		this._order = value
		this._order_id = value.id
	}
	get order_id(): ForeignKey {
		if (!this._order) {
			return this._order_id
		} else {
			return this._order.primaryKey
		}
	}

	private _product: _Product
	get product(): _Product {
		return this._product
	}
	set product(value: _Product) {
		this._product = value
		this._product_id = value.id
	}
	get product_id(): ForeignKey {
		if (!this._product) {
			return this._product_id
		} else {
			return this._product.primaryKey
		}
	}

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._vendor_id = value.id
	}
	get vendor_id(): ForeignKey {
		if (!this._user) {
			return this._vendor_id
		} else {
			return this._user.primaryKey
		}
	}

	private _tva_type: _TVAType
	get tva_type(): _TVAType {
		return this._tva_type
	}
	set tva_type(value: _TVAType) {
		this._tva_type = value
		this._tva_id = value.id
	}
	get tva_id(): ForeignKey {
		if (!this._tva_type) {
			return this._tva_id
		} else {
			return this._tva_type.primaryKey
		}
	}

	constructor(obj: _SubOrderConstructor) {
		this.init(obj)
	}

	private init(obj: _SubOrderConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.product_price = obj.product_price
		this.quantity = obj.quantity

		if (obj.expedition !== undefined) {
			if (obj.expedition instanceof _Expedition) {
				this.expedition = obj.expedition
			} else {
				this.expedition = new _Expedition(obj.expedition)
			}
		} else if (obj.expedition_id !== undefined) {
			this._expedition_id = obj.expedition_id
		} else throw new Error('Invalid constructor.')

		if (obj.order !== undefined) {
			if (obj.order instanceof _Order) {
				this.order = obj.order
			} else {
				this.order = new _Order(obj.order)
			}
		} else if (obj.order_id !== undefined) {
			this._order_id = obj.order_id
		} else throw new Error('Invalid constructor.')

		if (obj.product !== undefined) {
			if (obj.product instanceof _Product) {
				this.product = obj.product
			} else {
				this.product = new _Product(obj.product)
			}
		} else if (obj.product_id !== undefined) {
			this._product_id = obj.product_id
		} else throw new Error('Invalid constructor.')

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.vendor_id !== undefined) {
			this._vendor_id = obj.vendor_id
		} else throw new Error('Invalid constructor.')

		if (obj.tva_type !== undefined) {
			if (obj.tva_type instanceof _TVAType) {
				this.tva_type = obj.tva_type
			} else {
				this.tva_type = new _TVAType(obj.tva_type)
			}
		} else if (obj.tva_id !== undefined) {
			this._tva_id = obj.tva_id
		} else throw new Error('Invalid constructor.')
	}

	update(obj: { product_price?: number; quantity?: number }) {
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
			tva_id: this.tva_id,
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
			tva_id: this.tva_id!,
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
		includes: boolean = true,
	): Promise<_SubOrder | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _SubOrder.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _SubOrder.getIncludes()
			}
		}

		const dbQuery = await _SubOrder.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _SubOrder(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _SubOrder.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _SubOrder.getIncludes>[0], number>,
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
			const dbThis = await _SubOrder.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _SubOrder.getIncludes(param),
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
		if (this.expedition && !this.expedition.saving) {
			const expeditionYield = this.expedition!.saveToTransaction(tx)
			await expeditionYield.next()
			saveYieldsArray.push(expeditionYield)
		}

		if (this.order && !this.order.saving) {
			const orderYield = this.order!.saveToTransaction(tx)
			await orderYield.next()
			saveYieldsArray.push(orderYield)
		}

		if (this.product && !this.product.saving) {
			const productYield = this.product!.saveToTransaction(tx)
			await productYield.next()
			saveYieldsArray.push(productYield)
		}

		if (this.user && !this.user.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		if (this.tva_type && !this.tva_type.saving) {
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
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (!this.expedition && this.expedition_id) {
			throw new Error(
				"expedition can't be null or undefined in _SubOrder.",
			)
		}
		if (!this.order && this.order_id) {
			throw new Error("order can't be null or undefined in _SubOrder.")
		}
		if (!this.product && this.product_id) {
			throw new Error("product can't be null or undefined in _SubOrder.")
		}
		if (!this.user && this.vendor_id) {
			throw new Error("user can't be null or undefined in _SubOrder.")
		}
		if (!this.tva_type && this.tva_id) {
			throw new Error("tva_type can't be null or undefined in _SubOrder.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _SubOrder.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _SubOrder.prisma.deleteMany(query)).count
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
