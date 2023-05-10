import { _SubOrder } from './SubOrder'
import { Prisma, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _OrderConstructor = {
	id?: number
	order_client_id: number
	creation_date: number
	modification_date: number
	order_state: number
	type: number
	buyer_id: number
	buyer_billing_id: number
	buyer_delivery_id: number
	expedition_id: number
	order_total: number
	sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
}

export class _Order implements PrismaClass {
	static prisma: Prisma.OrderDelegate<undefined>
	get prisma(): Prisma.OrderDelegate<undefined> {
		return _Order.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		param?:
			| number
			| {
					sub_orders?:
						| boolean
						| Exclude<
								Parameters<typeof _SubOrder.getIncludes>[0],
								number
						  >
			  },
	): Prisma.OrderInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					sub_orders: true,
				}
			}
			return {
				sub_orders: { include: _SubOrder.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			return {
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

	order_client_id: number

	creation_date: number

	modification_date: number

	order_state: number

	type: number

	buyer_id: number

	buyer_billing_id: number

	buyer_delivery_id: number

	expedition_id: number

	order_total: number

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	constructor(obj: _OrderConstructor) {
		this.init(obj)
	}

	private init(obj: _OrderConstructor) {
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
	}

	update(obj: {
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
	}) {
		if (obj.order_client_id !== undefined) {
			this.order_client_id = obj.order_client_id
		}
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
		if (obj.order_state !== undefined) {
			this.order_state = obj.order_state
		}
		if (obj.type !== undefined) {
			this.type = obj.type
		}
		if (obj.buyer_id !== undefined) {
			this.buyer_id = obj.buyer_id
		}
		if (obj.buyer_billing_id !== undefined) {
			this.buyer_billing_id = obj.buyer_billing_id
		}
		if (obj.buyer_delivery_id !== undefined) {
			this.buyer_delivery_id = obj.buyer_delivery_id
		}
		if (obj.expedition_id !== undefined) {
			this.expedition_id = obj.expedition_id
		}
		if (obj.order_total !== undefined) {
			this.order_total = obj.order_total
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
	nonRelationsToJSON() {
		return {
			id: this.id!,
			order_client_id: this.order_client_id!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
			order_state: this.order_state!,
			type: this.type!,
			buyer_id: this.buyer_id!,
			buyer_billing_id: this.buyer_billing_id!,
			buyer_delivery_id: this.buyer_delivery_id!,
			expedition_id: this.expedition_id!,
			order_total: this.order_total!,
		}
	}

	static async all(query?: Prisma.OrderFindFirstArgsBase): Promise<_Order[]> {
		const models = await _Order.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Order(m))
			return acc
		}, [] as _Order[])
	}

	static async from(
		query?: Prisma.OrderFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Order | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Order.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Order.getIncludes()
			}
		}

		const dbQuery = await _Order.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Order(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Order.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Order.getIncludes>[0], number>,
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
			const dbThis = await _Order.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Order.getIncludes(param),
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
		const sub_ordersYield = this.sub_orders!.saveToTransaction(tx)
		await sub_ordersYield.next()
		saveYieldsArray.push(sub_ordersYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.order.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.order.update({
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
		if (this.order_client_id === undefined) {
			throw new Error('Missing field on _Order.save(): order_client_id')
		}
		if (this.creation_date === undefined) {
			throw new Error('Missing field on _Order.save(): creation_date')
		}
		if (this.modification_date === undefined) {
			throw new Error('Missing field on _Order.save(): modification_date')
		}
		if (this.order_state === undefined) {
			throw new Error('Missing field on _Order.save(): order_state')
		}
		if (this.type === undefined) {
			throw new Error('Missing field on _Order.save(): type')
		}
		if (this.buyer_id === undefined) {
			throw new Error('Missing field on _Order.save(): buyer_id')
		}
		if (this.buyer_billing_id === undefined) {
			throw new Error('Missing field on _Order.save(): buyer_billing_id')
		}
		if (this.buyer_delivery_id === undefined) {
			throw new Error('Missing field on _Order.save(): buyer_delivery_id')
		}
		if (this.expedition_id === undefined) {
			throw new Error('Missing field on _Order.save(): expedition_id')
		}
		if (this.order_total === undefined) {
			throw new Error('Missing field on _Order.save(): order_total')
		}

		if (this.sub_orders.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Order. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Order.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Order.prisma.deleteMany(query)).count
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
