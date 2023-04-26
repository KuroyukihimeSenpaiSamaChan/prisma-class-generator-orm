import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _UserDelivery implements PrismaClass {
	static prisma: Prisma.UserDeliveryDelegate<undefined>
	get prisma(): Prisma.UserDeliveryDelegate<undefined> {
		return _UserDelivery.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.UserDeliveryInclude {
		if (deep <= 0) {
			return {
				user: true,
			}
		}

		return {
			user: { include: _User.getIncludes(deep - 1) },
		}
	}

	// ID
	id: number = -1

	private user_id: ForeignKey

	address?: string

	additional_address?: string

	zipcode?: string

	city?: string

	country?: string

	region?: string

	phone_number?: string

	company_name?: string

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this.user_id = value.id
		} else {
			this._user = null
			this.user_id = value
		}
	}

	constructor(obj: {
		id?: number
		user_id?: ForeignKey
		address?: string
		additional_address?: string | null
		zipcode?: string
		city?: string
		country?: string
		region?: string
		phone_number?: string
		company_name?: string | null
		user?: _User | User | ForeignKey
	}) {
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _UserDelivery>[0]) {
		if (obj.id !== undefined) {
			this.id = obj.id
		}
		this.address = obj.address
		this.additional_address =
			obj.additional_address !== null ? obj.additional_address : undefined
		this.zipcode = obj.zipcode
		this.city = obj.city
		this.country = obj.country
		this.region = obj.region
		this.phone_number = obj.phone_number
		this.company_name =
			obj.company_name !== null ? obj.company_name : undefined

		if (!obj.user) {
			if (obj.user_id === undefined) {
				this.user = null
			} else {
				this.user = obj.user_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}
	}

	toJSON() {
		return {
			id: this.id,
			user_id: this.user_id,
			address: this.address,
			additional_address: this.additional_address,
			zipcode: this.zipcode,
			city: this.city,
			country: this.country,
			region: this.region,
			phone_number: this.phone_number,
			company_name: this.company_name,
			user: this.user,
		}
	}

	static async all(
		query: Prisma.UserDeliveryFindFirstArgsBase,
	): Promise<_UserDelivery[]> {
		const models = await _UserDelivery.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _UserDelivery(m))
			return acc
		}, [] as _UserDelivery[])
	}

	static async from<F extends Prisma.UserDeliveryWhereInput>(
		where: F,
		opt?: Omit<Prisma.UserDeliveryFindFirstArgsBase, 'where'>,
	): Promise<_UserDelivery | null> {
		let prismaOptions = opt
		if (prismaOptions === undefined) {
			prismaOptions = {
				include: _UserDelivery.getIncludes(),
			}
		} else if (
			prismaOptions !== undefined &&
			prismaOptions.include === undefined &&
			prismaOptions.select === undefined
		) {
			prismaOptions.include = _UserDelivery.getIncludes()
		}

		const dbQuery = await _UserDelivery.prisma.findFirst({
			where: where,
			...opt,
		})

		if (dbQuery === null) return null

		return new _UserDelivery(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _UserDelivery.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserDelivery.getIncludes(depth),
			})
			if (dbThis !== null) {
				this.init({ ...this.toJSON(), ...dbThis })
			}
		}
	}

	async save(): Promise<boolean> {
		try {
		} catch (err) {
			console.log(err)
			return false
		}
		return true
	}
}
