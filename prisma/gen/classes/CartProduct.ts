import { _Cart } from './Cart'
import { _Product } from './Product'
import { Prisma, Cart, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _CartProductConstructor<
	basketType extends ForeignKey | undefined = ForeignKey | undefined,
	productType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	quantity: number
} & (basketType extends ForeignKey
	? {
			basket_id: ForeignKey
			basket?: Cart | _Cart
	  }
	: {
			basket_id?: ForeignKey
			basket: Cart | _Cart
	  }) &
	(productType extends ForeignKey
		? {
				product_id: ForeignKey
				product?: Product | _Product
		  }
		: {
				product_id?: ForeignKey
				product: Product | _Product
		  })

export class _CartProduct implements PrismaClass {
	static prisma: Prisma.CartProductDelegate<undefined>
	get prisma(): Prisma.CartProductDelegate<undefined> {
		return _CartProduct.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		param?:
			| number
			| {
					basket?:
						| boolean
						| Exclude<
								Parameters<typeof _Cart.getIncludes>[0],
								number
						  >
					product?:
						| boolean
						| Exclude<
								Parameters<typeof _Product.getIncludes>[0],
								number
						  >
			  },
	): Prisma.CartProductInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					basket: true,
					product: true,
				}
			}
			return {
				basket: { include: _Cart.getIncludes(param - 1) },
				product: { include: _Product.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			const query = {
				basket: Object.keys(param).includes('basket')
					? typeof param.basket === 'boolean'
						? true
						: {
								include: _Cart.getIncludes(param.basket),
						  }
					: undefined,
				product: Object.keys(param).includes('product')
					? typeof param.product === 'boolean'
						? true
						: {
								include: _Product.getIncludes(param.product),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) => query[key] === undefined && delete query[key],
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

	private _basket_id: ForeignKey

	private _product_id: ForeignKey

	quantity: number

	private _basket: _Cart
	get basket(): _Cart {
		return this._basket
	}
	set basket(value: _Cart) {
		this._basket = value
		this._basket_id = value.id
	}
	get basket_id(): ForeignKey {
		if (!this._basket) {
			return this._basket_id
		} else {
			return this._basket.primaryKey
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

	constructor(obj: _CartProductConstructor) {
		this.init(obj)
	}

	private init(obj: _CartProductConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.quantity = obj.quantity

		if (obj.basket !== undefined) {
			if (obj.basket instanceof _Cart) {
				this.basket = obj.basket
			} else {
				this.basket = new _Cart(obj.basket)
			}
		} else if (obj.basket_id !== undefined) {
			this._basket_id = obj.basket_id
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
	}

	update(obj: { quantity?: number }) {
		if (obj.quantity !== undefined) {
			this.quantity = obj.quantity
		}
	}

	toJSON() {
		return {
			id: this.id,
			basket_id: this.basket_id,
			product_id: this.product_id,
			quantity: this.quantity,
			basket: this.basket,
			product: this.product,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			basket_id: this.basket_id!,
			product_id: this.product_id!,
			quantity: this.quantity!,
		}
	}

	static async all(
		query?: Prisma.CartProductFindFirstArgsBase,
	): Promise<_CartProduct[]> {
		const models = await _CartProduct.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _CartProduct(m))
			return acc
		}, [] as _CartProduct[])
	}

	static async from(
		query?: Prisma.CartProductFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_CartProduct | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _CartProduct.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _CartProduct.getIncludes()
			}
		}

		const dbQuery = await _CartProduct.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _CartProduct(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _CartProduct.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _CartProduct.getIncludes>[0], number>,
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
			const dbThis = await _CartProduct.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _CartProduct.getIncludes(param),
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
		if (this.basket && !this.basket.saving) {
			const basketYield = this.basket!.saveToTransaction(tx)
			await basketYield.next()
			saveYieldsArray.push(basketYield)
		}

		if (this.product && !this.product.saving) {
			const productYield = this.product!.saveToTransaction(tx)
			await productYield.next()
			saveYieldsArray.push(productYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.cartProduct.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.cartProduct.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {}

	static async deleteAll(
		query: Parameters<typeof _CartProduct.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _CartProduct.prisma.deleteMany(query)).count
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
