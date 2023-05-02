import { _AccessToken } from './AccessToken'
import { _Media } from './Media'
import { _Product } from './Product'
import { _SubOrder } from './SubOrder'
import { _UserBilling } from './UserBilling'
import { _UserDelete } from './UserDelete'
import { _UserDelivery } from './UserDelivery'
import { _Role } from './Role'
import {
	Prisma,
	AccessToken,
	Media,
	Product,
	SubOrder,
	UserBilling,
	UserDelete,
	UserDelivery,
	Role,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _User extends PrismaClass {
	static prisma: Prisma.UserDelegate<undefined>
	get prisma(): Prisma.UserDelegate<undefined> {
		return _User.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.UserInclude {
		if (deep <= 0) {
			return {
				access_token: true,
				media: true,
				product: true,
				sub_order: true,
				user_billing: true,
				user_delete: true,
				user_delivery: true,
				roles: true,
			}
		}

		return {
			access_token: { include: _AccessToken.getIncludes(deep - 1) },
			media: { include: _Media.getIncludes(deep - 1) },
			product: { include: _Product.getIncludes(deep - 1) },
			sub_order: { include: _SubOrder.getIncludes(deep - 1) },
			user_billing: { include: _UserBilling.getIncludes(deep - 1) },
			user_delete: { include: _UserDelete.getIncludes(deep - 1) },
			user_delivery: { include: _UserDelivery.getIncludes(deep - 1) },
			roles: { include: _Role.getIncludes(deep - 1) },
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

	user_pass?: string

	// UNIQUE
	user_email?: string

	user_registered?: boolean = false

	firstname?: string

	lastname?: string

	birthdate?: number

	token?: string

	deleting?: number | null

	private _access_token: RelationMany<_AccessToken>
	public get access_token(): RelationMany<_AccessToken> {
		return this._access_token
	}
	private set access_token(value: RelationMany<_AccessToken>) {
		this._access_token = value
	}

	private _media: RelationMany<_Media>
	public get media(): RelationMany<_Media> {
		return this._media
	}
	private set media(value: RelationMany<_Media>) {
		this._media = value
	}

	private _product: RelationMany<_Product>
	public get product(): RelationMany<_Product> {
		return this._product
	}
	private set product(value: RelationMany<_Product>) {
		this._product = value
	}

	private _sub_order: RelationMany<_SubOrder>
	public get sub_order(): RelationMany<_SubOrder> {
		return this._sub_order
	}
	private set sub_order(value: RelationMany<_SubOrder>) {
		this._sub_order = value
	}

	private _user_billing: RelationMany<_UserBilling>
	public get user_billing(): RelationMany<_UserBilling> {
		return this._user_billing
	}
	private set user_billing(value: RelationMany<_UserBilling>) {
		this._user_billing = value
	}

	private _user_delete: RelationMany<_UserDelete>
	public get user_delete(): RelationMany<_UserDelete> {
		return this._user_delete
	}
	private set user_delete(value: RelationMany<_UserDelete>) {
		this._user_delete = value
	}

	private _user_delivery: RelationMany<_UserDelivery>
	public get user_delivery(): RelationMany<_UserDelivery> {
		return this._user_delivery
	}
	private set user_delivery(value: RelationMany<_UserDelivery>) {
		this._user_delivery = value
	}

	private _roles: RelationMany<_Role>
	public get roles(): RelationMany<_Role> {
		return this._roles
	}
	private set roles(value: RelationMany<_Role>) {
		this._roles = value
	}

	constructor(obj: {
		id?: number
		user_pass?: string
		user_email?: string
		user_registered?: boolean
		firstname?: string
		lastname?: string
		birthdate?: number
		token?: string
		deleting?: number | null

		access_token?:
			| _AccessToken[]
			| AccessToken[]
			| RelationMany<_AccessToken>
		media?: _Media[] | Media[] | RelationMany<_Media>
		product?: _Product[] | Product[] | RelationMany<_Product>
		sub_order?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
		user_billing?:
			| _UserBilling[]
			| UserBilling[]
			| RelationMany<_UserBilling>
		user_delete?: _UserDelete[] | UserDelete[] | RelationMany<_UserDelete>
		user_delivery?:
			| _UserDelivery[]
			| UserDelivery[]
			| RelationMany<_UserDelivery>
		roles?: _Role[] | Role[] | RelationMany<_Role>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _User>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.user_pass = obj.user_pass
		this.user_email = obj.user_email
		this.user_registered =
			obj.user_registered !== undefined ? obj.user_registered : false
		this.firstname = obj.firstname
		this.lastname = obj.lastname
		this.birthdate = obj.birthdate
		this.token = obj.token
		this.deleting = obj.deleting !== null ? obj.deleting : undefined

		if (!obj.access_token || obj.access_token.length === 0) {
			this.access_token = new RelationMany<_AccessToken>([])
		} else if (obj.access_token instanceof RelationMany) {
			this.access_token = obj.access_token
		} else if (obj.access_token[0] instanceof _AccessToken) {
			this.access_token = new RelationMany<_AccessToken>(
				obj.access_token as _AccessToken[],
			)
		} else {
			const access_tokenArray: _AccessToken[] = []
			for (const value of obj.access_token as AccessToken[]) {
				access_tokenArray.push(new _AccessToken(value))
			}
			this.access_token = new RelationMany<_AccessToken>(
				access_tokenArray,
			)
		}

		if (!obj.media || obj.media.length === 0) {
			this.media = new RelationMany<_Media>([])
		} else if (obj.media instanceof RelationMany) {
			this.media = obj.media
		} else if (obj.media[0] instanceof _Media) {
			this.media = new RelationMany<_Media>(obj.media as _Media[])
		} else {
			const mediaArray: _Media[] = []
			for (const value of obj.media as Media[]) {
				mediaArray.push(new _Media(value))
			}
			this.media = new RelationMany<_Media>(mediaArray)
		}

		if (!obj.product || obj.product.length === 0) {
			this.product = new RelationMany<_Product>([])
		} else if (obj.product instanceof RelationMany) {
			this.product = obj.product
		} else if (obj.product[0] instanceof _Product) {
			this.product = new RelationMany<_Product>(obj.product as _Product[])
		} else {
			const productArray: _Product[] = []
			for (const value of obj.product as Product[]) {
				productArray.push(new _Product(value))
			}
			this.product = new RelationMany<_Product>(productArray)
		}

		if (!obj.sub_order || obj.sub_order.length === 0) {
			this.sub_order = new RelationMany<_SubOrder>([])
		} else if (obj.sub_order instanceof RelationMany) {
			this.sub_order = obj.sub_order
		} else if (obj.sub_order[0] instanceof _SubOrder) {
			this.sub_order = new RelationMany<_SubOrder>(
				obj.sub_order as _SubOrder[],
			)
		} else {
			const sub_orderArray: _SubOrder[] = []
			for (const value of obj.sub_order as SubOrder[]) {
				sub_orderArray.push(new _SubOrder(value))
			}
			this.sub_order = new RelationMany<_SubOrder>(sub_orderArray)
		}

		if (!obj.user_billing || obj.user_billing.length === 0) {
			this.user_billing = new RelationMany<_UserBilling>([])
		} else if (obj.user_billing instanceof RelationMany) {
			this.user_billing = obj.user_billing
		} else if (obj.user_billing[0] instanceof _UserBilling) {
			this.user_billing = new RelationMany<_UserBilling>(
				obj.user_billing as _UserBilling[],
			)
		} else {
			const user_billingArray: _UserBilling[] = []
			for (const value of obj.user_billing as UserBilling[]) {
				user_billingArray.push(new _UserBilling(value))
			}
			this.user_billing = new RelationMany<_UserBilling>(
				user_billingArray,
			)
		}

		if (!obj.user_delete || obj.user_delete.length === 0) {
			this.user_delete = new RelationMany<_UserDelete>([])
		} else if (obj.user_delete instanceof RelationMany) {
			this.user_delete = obj.user_delete
		} else if (obj.user_delete[0] instanceof _UserDelete) {
			this.user_delete = new RelationMany<_UserDelete>(
				obj.user_delete as _UserDelete[],
			)
		} else {
			const user_deleteArray: _UserDelete[] = []
			for (const value of obj.user_delete as UserDelete[]) {
				user_deleteArray.push(new _UserDelete(value))
			}
			this.user_delete = new RelationMany<_UserDelete>(user_deleteArray)
		}

		if (!obj.user_delivery || obj.user_delivery.length === 0) {
			this.user_delivery = new RelationMany<_UserDelivery>([])
		} else if (obj.user_delivery instanceof RelationMany) {
			this.user_delivery = obj.user_delivery
		} else if (obj.user_delivery[0] instanceof _UserDelivery) {
			this.user_delivery = new RelationMany<_UserDelivery>(
				obj.user_delivery as _UserDelivery[],
			)
		} else {
			const user_deliveryArray: _UserDelivery[] = []
			for (const value of obj.user_delivery as UserDelivery[]) {
				user_deliveryArray.push(new _UserDelivery(value))
			}
			this.user_delivery = new RelationMany<_UserDelivery>(
				user_deliveryArray,
			)
		}

		if (!obj.roles || obj.roles.length === 0) {
			this.roles = new RelationMany<_Role>([])
		} else if (obj.roles instanceof RelationMany) {
			this.roles = obj.roles
		} else if (obj.roles[0] instanceof _Role) {
			this.roles = new RelationMany<_Role>(obj.roles as _Role[])
		} else {
			const rolesArray: _Role[] = []
			for (const value of obj.roles as Role[]) {
				rolesArray.push(new _Role(value))
			}
			this.roles = new RelationMany<_Role>(rolesArray)
		}
	}

	update(obj: {
		id?: number
		user_pass?: string
		user_email?: string
		user_registered?: boolean
		firstname?: string
		lastname?: string
		birthdate?: number
		token?: string
		deleting?: number | null
	}) {
		if (obj.user_pass !== undefined) {
			this.user_pass = obj.user_pass
		}
		if (obj.user_email !== undefined) {
			this.user_email = obj.user_email
		}
		if (obj.user_registered !== undefined) {
			this.user_registered = obj.user_registered
		}
		if (obj.firstname !== undefined) {
			this.firstname = obj.firstname
		}
		if (obj.lastname !== undefined) {
			this.lastname = obj.lastname
		}
		if (obj.birthdate !== undefined) {
			this.birthdate = obj.birthdate
		}
		if (obj.token !== undefined) {
			this.token = obj.token
		}
		if (obj.deleting !== undefined) {
			this.deleting = obj.deleting
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_pass: this.user_pass,
			user_email: this.user_email,
			user_registered: this.user_registered,
			firstname: this.firstname,
			lastname: this.lastname,
			birthdate: this.birthdate,
			token: this.token,
			deleting: this.deleting,
			access_token: this.access_token,
			media: this.media,
			product: this.product,
			sub_order: this.sub_order,
			user_billing: this.user_billing,
			user_delete: this.user_delete,
			user_delivery: this.user_delivery,
			roles: this.roles,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_pass: this.user_pass!,
			user_email: this.user_email!,
			user_registered: this.user_registered!,
			firstname: this.firstname!,
			lastname: this.lastname!,
			birthdate: this.birthdate!,
			token: this.token!,
			deleting: this.deleting!,
		}
	}

	static async all(query?: Prisma.UserFindFirstArgsBase): Promise<_User[]> {
		const models = await _User.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _User(m))
			return acc
		}, [] as _User[])
	}

	static async from(
		query?: Prisma.UserFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_User | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _User.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _User.getIncludes()
			}
		}

		const dbQuery = await _User.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _User(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _User.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _User.getIncludes(depth),
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

		// Relations toMany
		const access_tokenYield = this.access_token!.saveToTransaction(tx)
		await access_tokenYield.next()
		saveYieldsArray.push(access_tokenYield)

		const mediaYield = this.media!.saveToTransaction(tx)
		await mediaYield.next()
		saveYieldsArray.push(mediaYield)

		const productYield = this.product!.saveToTransaction(tx)
		await productYield.next()
		saveYieldsArray.push(productYield)

		const sub_orderYield = this.sub_order!.saveToTransaction(tx)
		await sub_orderYield.next()
		saveYieldsArray.push(sub_orderYield)

		const user_billingYield = this.user_billing!.saveToTransaction(tx)
		await user_billingYield.next()
		saveYieldsArray.push(user_billingYield)

		const user_deleteYield = this.user_delete!.saveToTransaction(tx)
		await user_deleteYield.next()
		saveYieldsArray.push(user_deleteYield)

		const user_deliveryYield = this.user_delivery!.saveToTransaction(tx)
		await user_deliveryYield.next()
		saveYieldsArray.push(user_deliveryYield)

		const rolesYield = this.roles!.saveToTransaction(tx)
		await rolesYield.next()
		saveYieldsArray.push(rolesYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		const rolesConnections: Prisma.Enumerable<Prisma.RoleWhereUniqueInput> =
			[]
		for (const relation of this.roles) {
			rolesConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.user.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						roles: {
							connect: rolesConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.user.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					roles: {
						connect: rolesConnections,
					},
				},
			})
		}

		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.user_pass === undefined) {
			throw new Error('Missing field on _User.save(): user_pass')
		}
		if (this.user_email === undefined) {
			throw new Error('Missing field on _User.save(): user_email')
		}
		if (this.user_registered === undefined) {
			throw new Error('Missing field on _User.save(): user_registered')
		}
		if (this.firstname === undefined) {
			throw new Error('Missing field on _User.save(): firstname')
		}
		if (this.lastname === undefined) {
			throw new Error('Missing field on _User.save(): lastname')
		}
		if (this.birthdate === undefined) {
			throw new Error('Missing field on _User.save(): birthdate')
		}
		if (this.token === undefined) {
			throw new Error('Missing field on _User.save(): token')
		}

		if (this.access_token.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.media.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.product.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.sub_order.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.user_billing.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.user_delete.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.user_delivery.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
		if (this.roles.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _User. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _User.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _User.prisma.deleteMany(query)).count
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
