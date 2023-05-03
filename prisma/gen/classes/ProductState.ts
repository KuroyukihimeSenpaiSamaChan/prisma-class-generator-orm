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

	static getIncludes(
		depth: number = 0,
		filter?: {
			products?: boolean | Parameters<typeof _Product.getIncludes>[1]
		},
	): Prisma.ProductStateInclude {
		if (filter === undefined) {
			if (depth <= 0) {
				return {
					products: true,
				}
			}
			return {
				products: { include: _Product.getIncludes(depth - 1) },
			}
		} else {
			if (depth <= 0) {
				return {
					products: Object.keys(filter).includes('products')
						? true
						: undefined,
				}
			}
			return {
				products: Object.keys(filter).includes('products')
					? {
							include: _Product.getIncludes(
								depth - 1,
								typeof filter.products === 'boolean'
									? undefined
									: filter.products,
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

	update(obj: { id?: number; state?: string }) {
		if (obj.state !== undefined) {
			this.state = obj.state
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

	static async from(
		query?: Prisma.ProductStateFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_ProductState | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _ProductState.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _ProductState.getIncludes()
			}
		}

		const dbQuery = await _ProductState.prisma.findFirst({
			...query,
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

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.productState.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.productState.update({
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
		if (this.state === undefined) {
			throw new Error('Missing field on _ProductState.save(): state')
		}

		if (this.products.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _ProductState. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _ProductState.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _ProductState.prisma.deleteMany(query)).count
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
