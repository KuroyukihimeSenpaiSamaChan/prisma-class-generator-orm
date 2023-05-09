import { _SubOrder } from './SubOrder'
import { Prisma, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Expedition implements PrismaClass {
	static prisma: Prisma.ExpeditionDelegate<undefined>
	get prisma(): Prisma.ExpeditionDelegate<undefined> {
		return _Expedition.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static async initList() {
		if (this.enumList === null) {
			return
		}

		const models = await this.prisma.findMany()
		this.enumList = []
		for (const model of models) {
			this.enumList.push(new _Expedition(model))
		}
	}

	private static enumList: _Expedition[]
	static get list(): _Expedition[] {
		return this.enumList
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
	): Prisma.ExpeditionInclude {
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

	name: number

	slug: number

	max_weight: number

	price: number

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	constructor(obj: {
		id?: number
		name: number
		slug: number
		max_weight: number
		price: number

		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Expedition>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.name = obj.name
		this.slug = obj.slug
		this.max_weight = obj.max_weight
		this.price = obj.price

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
		name?: number
		slug?: number
		max_weight?: number
		price?: number
	}) {
		if (obj.name !== undefined) {
			this.name = obj.name
		}
		if (obj.slug !== undefined) {
			this.slug = obj.slug
		}
		if (obj.max_weight !== undefined) {
			this.max_weight = obj.max_weight
		}
		if (obj.price !== undefined) {
			this.price = obj.price
		}
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			slug: this.slug,
			max_weight: this.max_weight,
			price: this.price,
			sub_orders: this.sub_orders,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			name: this.name!,
			slug: this.slug!,
			max_weight: this.max_weight!,
			price: this.price!,
		}
	}

	static async all(
		query?: Prisma.ExpeditionFindFirstArgsBase,
	): Promise<_Expedition[]> {
		const models = await _Expedition.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Expedition(m))
			return acc
		}, [] as _Expedition[])
	}

	static async from(
		query?: Prisma.ExpeditionFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Expedition | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Expedition.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Expedition.getIncludes()
			}
		}

		const dbQuery = await _Expedition.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Expedition(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Expedition.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Expedition.getIncludes>[0], number>,
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
			const dbThis = await _Expedition.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Expedition.getIncludes(param),
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
				await tx.expedition.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.expedition.update({
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
		if (this.name === undefined) {
			throw new Error('Missing field on _Expedition.save(): name')
		}
		if (this.slug === undefined) {
			throw new Error('Missing field on _Expedition.save(): slug')
		}
		if (this.max_weight === undefined) {
			throw new Error('Missing field on _Expedition.save(): max_weight')
		}
		if (this.price === undefined) {
			throw new Error('Missing field on _Expedition.save(): price')
		}

		if (this.sub_orders.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Expedition. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Expedition.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Expedition.prisma.deleteMany(query)).count
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
