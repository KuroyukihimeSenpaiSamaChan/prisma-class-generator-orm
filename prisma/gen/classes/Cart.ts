import { _User } from './User'
import { _CartProduct } from './CartProduct'
import { Prisma, User, CartProduct } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _CartConstructor<
	userType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	creation_date: number
	modification_date: number
	products?: _CartProduct[] | CartProduct[] | RelationMany<_CartProduct>
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _Cart implements PrismaClass {
	static prisma: Prisma.CartDelegate<undefined>
	get prisma(): Prisma.CartDelegate<undefined> {
		return _Cart.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(
		param?:
			| number
			| {
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
					products?:
						| boolean
						| Exclude<
								Parameters<typeof _CartProduct.getIncludes>[0],
								number
						  >
			  },
	): Prisma.CartInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					user: true,
					products: true,
				}
			}
			return {
				user: { include: _User.getIncludes(param - 1) },
				products: { include: _CartProduct.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			return {
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
				products: Object.keys(param).includes('products')
					? typeof param.products === 'boolean'
						? true
						: {
								include: _CartProduct.getIncludes(
									param.products,
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

	private _user_id: ForeignKey

	creation_date: number

	modification_date: number

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._user_id = value.id
	}
	get user_id(): ForeignKey {
		if (!this._user) {
			return this._user_id
		} else {
			return this._user.primaryKey
		}
	}

	private _products: RelationMany<_CartProduct>
	public get products(): RelationMany<_CartProduct> {
		return this._products
	}
	private set products(value: RelationMany<_CartProduct>) {
		this._products = value
	}

	constructor(obj: _CartConstructor) {
		this.init(obj)
	}

	private init(obj: _CartConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')

		if (!obj.products || obj.products.length === 0) {
			this.products = new RelationMany<_CartProduct>()
		} else if (obj.products instanceof RelationMany) {
			this.products = obj.products
		} else if (obj.products[0] instanceof _CartProduct) {
			this.products = new RelationMany<_CartProduct>(
				obj.products as _CartProduct[],
			)
		} else {
			const productsArray: _CartProduct[] = []
			for (const value of obj.products as CartProduct[]) {
				productsArray.push(new _CartProduct(value))
			}
			this.products = new RelationMany<_CartProduct>(productsArray)
		}
	}

	update(obj: { creation_date?: number; modification_date?: number }) {
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			user: this.user,
			products: this.products,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_id: this.user_id!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
		}
	}

	static async all(query?: Prisma.CartFindFirstArgsBase): Promise<_Cart[]> {
		const models = await _Cart.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Cart(m))
			return acc
		}, [] as _Cart[])
	}

	static async from(
		query?: Prisma.CartFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Cart | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Cart.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Cart.getIncludes()
			}
		}

		const dbQuery = await _Cart.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Cart(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Cart.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Cart.getIncludes>[0], number>,
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
			const dbThis = await _Cart.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Cart.getIncludes(param),
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
		if (this.user && !this.user.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

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
				await tx.cart.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.cart.update({
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
		if (!this.user && this.user_id) {
			throw new Error("user can't be null or undefined in _Cart.")
		}

		if (this.products.length > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Cart. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Cart.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Cart.prisma.deleteMany(query)).count
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
