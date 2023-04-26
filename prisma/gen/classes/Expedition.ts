import { _SubOrder } from './SubOrder'
import { Prisma, SubOrder } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Expedition extends PrismaClass {
	static prisma: Prisma.ExpeditionDelegate<undefined>
	get prisma(): Prisma.ExpeditionDelegate<undefined> {
		return _Expedition.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.ExpeditionInclude {
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

	name?: number

	slug?: number

	max_weight?: number

	price?: number

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	constructor(obj: {
		id?: number
		name?: number
		slug?: number
		max_weight?: number
		price?: number

		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
	}) {
		super()
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
			name: this.name,
			slug: this.slug,
			max_weight: this.max_weight,
			price: this.price,
			sub_orders: this.sub_orders,
		}
	}

	static async all(
		query: Prisma.ExpeditionFindFirstArgsBase,
	): Promise<_Expedition[]> {
		const models = await _Expedition.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Expedition(m))
			return acc
		}, [] as _Expedition[])
	}

	static async from<F extends Prisma.ExpeditionWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.ExpeditionFindUniqueArgsBase, 'where'>,
	): Promise<_Expedition | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _Expedition.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _Expedition.getIncludes()
		}

		const dbQuery = await _Expedition.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _Expedition(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Expedition.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Expedition.getIncludes(depth),
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
			throw new Error('Invalid field on _Expedition.save(): id')
		}

		if (this.name === undefined) {
			throw new Error('Invalid field on _Expedition.save(): name')
		}

		if (this.slug === undefined) {
			throw new Error('Invalid field on _Expedition.save(): slug')
		}

		if (this.max_weight === undefined) {
			throw new Error('Invalid field on _Expedition.save(): max_weight')
		}

		if (this.price === undefined) {
			throw new Error('Invalid field on _Expedition.save(): price')
		}

		if (this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on _Expedition. Save it first, then add the toMany fields",
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
