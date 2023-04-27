import { _Product } from './Product'
import { Prisma, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _ProductState extends PrismaClass {
	static prisma: Prisma.ProductStateDelegate<undefined>
	get prisma(): Prisma.ProductStateDelegate<undefined> {
		return _ProductState.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.ProductStateInclude {
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
	private _id: number = -1
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	state?: string

	private _products: RelationMany<_Product>
	public get products(): RelationMany<_Product> {
		return this._products
	}
	private set products(value: RelationMany<_Product>) {
		this._products = value
	}

	constructor(obj: {
		id?: number
		state?: string

		products?: _Product[] | Product[] | RelationMany<_Product>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _ProductState>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.state = obj.state

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
		return { id: this.id, state: this.state, products: this.products }
	}
	nonRelationsToJSON() {
		return { id: this.id!, state: this.state! }
	}

	static async all(
		query?: Prisma.ProductStateFindFirstArgsBase,
	): Promise<_ProductState[]> {
		const models = await _ProductState.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _ProductState(m))
			return acc
		}, [] as _ProductState[])
	}

	static async from<F extends Prisma.ProductStateWhereUniqueInput>(
		where: F,
		opt?: Omit<Prisma.ProductStateFindUniqueArgsBase, 'where'>,
	): Promise<_ProductState | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _ProductState.getIncludes(),
			}
		} else if (
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _ProductState.getIncludes()
		}

		const dbQuery = await _ProductState.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _ProductState(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _ProductState.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _ProductState.getIncludes(depth),
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
		this.checkRequiredFields()

		const saveYieldsArray: AsyncGenerator<number, number, unknown>[] = []

		// Relations toOne

		// Relations toMany
		const productsYield = this.products!.saveToTransaction(tx)
		await productsYield.next()
		saveYieldsArray.push(productsYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await this.prisma.create({
					data: { ...this.nonRelationsToJSON(), id: undefined },
					select: { id: true },
				})
			).id
		} else {
			await this.prisma.update({
				where: { id: this._id },
				data: { ...this.nonRelationsToJSON() },
			})
		}

		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.state === undefined) {
			throw new Error('Missing field on _ProductState.save(): state')
		}

		if (this.products.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _ProductState. Save it first, then add the toMany fields",
			)
		}
	}
}
