import { _SubOrder } from './SubOrder'
import { Prisma, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Order extends PrismaClass {
	static prisma: Prisma.OrderDelegate<undefined>
	get prisma(): Prisma.OrderDelegate<undefined> {
		return _Order.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.OrderInclude {
		if (deep <= 0) {
			return {
				sub_orders: true,
			}
		}

		return {
			sub_orders: { include: _SubOrder.getIncludes(deep - 1) },
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

	order_client_id?: number

	creation_date?: number

	modification_date?: number

	order_state?: number

	type?: number

	buyer_id?: number

	buyer_billing_id?: number

	buyer_delivery_id?: number

	expedition_id?: number

	order_total?: number

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	constructor(obj: {
		id?: number
		order_client_id?: number
		creation_date?: number
		modification_date?: number
		order_state?: number
		type?: number
		buyer_id?: number
		buyer_billing_id?: number
		buyer_delivery_id?: number
		expedition_id?: number
		order_total?: number

		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Order>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.order_client_id = obj.order_client_id
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date
		this.order_state = obj.order_state
		this.type = obj.type
		this.buyer_id = obj.buyer_id
		this.buyer_billing_id = obj.buyer_billing_id
		this.buyer_delivery_id = obj.buyer_delivery_id
		this.expedition_id = obj.expedition_id
		this.order_total = obj.order_total

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
			order_client_id: this.order_client_id,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			order_state: this.order_state,
			type: this.type,
			buyer_id: this.buyer_id,
			buyer_billing_id: this.buyer_billing_id,
			buyer_delivery_id: this.buyer_delivery_id,
			expedition_id: this.expedition_id,
			order_total: this.order_total,
			sub_orders: this.sub_orders,
		}
	}

	static async all(query: Prisma.OrderFindFirstArgsBase): Promise<_Order[]> {
		const models = await _Order.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Order(m))
			return acc
		}, [] as _Order[])
	}

	static async from<F extends Prisma.OrderWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.OrderFindUniqueArgsBase, 'where'>,
	): Promise<_Order | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _Order.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _Order.getIncludes()
		}

		const dbQuery = await _Order.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _Order(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Order.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Order.getIncludes(depth),
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
			throw new Error('Invalid field on _Order.save(): id')
		}

		if (this.order_client_id === undefined) {
			throw new Error('Invalid field on _Order.save(): order_client_id')
		}

		if (this.creation_date === undefined) {
			throw new Error('Invalid field on _Order.save(): creation_date')
		}

		if (this.modification_date === undefined) {
			throw new Error('Invalid field on _Order.save(): modification_date')
		}

		if (this.order_state === undefined) {
			throw new Error('Invalid field on _Order.save(): order_state')
		}

		if (this.type === undefined) {
			throw new Error('Invalid field on _Order.save(): type')
		}

		if (this.buyer_id === undefined) {
			throw new Error('Invalid field on _Order.save(): buyer_id')
		}

		if (this.buyer_billing_id === undefined) {
			throw new Error('Invalid field on _Order.save(): buyer_billing_id')
		}

		if (this.buyer_delivery_id === undefined) {
			throw new Error('Invalid field on _Order.save(): buyer_delivery_id')
		}

		if (this.expedition_id === undefined) {
			throw new Error('Invalid field on _Order.save(): expedition_id')
		}

		if (this.order_total === undefined) {
			throw new Error('Invalid field on _Order.save(): order_total')
		}

		if (this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on _Order. Save it first, then add the toMany fields",
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
