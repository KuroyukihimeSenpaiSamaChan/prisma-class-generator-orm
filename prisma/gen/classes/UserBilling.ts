import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _UserBilling extends PrismaClass {
	static prisma: Prisma.UserBillingDelegate<undefined>
	get prisma(): Prisma.UserBillingDelegate<undefined> {
		return _UserBilling.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.UserBillingInclude {
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
	private _id: number = -1
	get id(): number {
		return this._id
	}
	get primaryKey(): number {
		return this._id
	}

	private _user_id: ForeignKey

	address?: string

	additional_address?: string | null

	zipcode?: string

	city?: string

	country?: string

	region?: string

	phone_number?: string

	company_name?: string | null

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.user_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this._user_id = value.id
		} else {
			this._user = null
			this._user_id = value
		}
	}
	get user_id(): ForeignKey {
		if (this._user === null) {
			return this._user_id
		} else {
			return this._user.primaryKey
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
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _UserBilling>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
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

	update(obj: {
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
	}) {
		if (obj.address !== undefined) {
			this.address = obj.address
		}
		if (obj.additional_address !== undefined) {
			this.additional_address = obj.additional_address
		}
		if (obj.zipcode !== undefined) {
			this.zipcode = obj.zipcode
		}
		if (obj.city !== undefined) {
			this.city = obj.city
		}
		if (obj.country !== undefined) {
			this.country = obj.country
		}
		if (obj.region !== undefined) {
			this.region = obj.region
		}
		if (obj.phone_number !== undefined) {
			this.phone_number = obj.phone_number
		}
		if (obj.company_name !== undefined) {
			this.company_name = obj.company_name
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
	nonRelationsToJSON() {
		return {
			id: this.id!,
			user_id: this.user_id!,
			address: this.address!,
			additional_address: this.additional_address!,
			zipcode: this.zipcode!,
			city: this.city!,
			country: this.country!,
			region: this.region!,
			phone_number: this.phone_number!,
			company_name: this.company_name!,
		}
	}

	static async all(
		query?: Prisma.UserBillingFindFirstArgsBase,
	): Promise<_UserBilling[]> {
		const models = await _UserBilling.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _UserBilling(m))
			return acc
		}, [] as _UserBilling[])
	}

	static async from(
		query?: Prisma.UserBillingFindFirstArgsBase,
	): Promise<_UserBilling | null> {
		if (query === undefined) {
			query = {
				include: _UserBilling.getIncludes(),
			}
		} else if (query.include === undefined && query.select === undefined) {
			query.include = _UserBilling.getIncludes()
		}

		const dbQuery = await _UserBilling.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserBilling(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _UserBilling.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserBilling.getIncludes(depth),
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
		if (typeof this.user !== 'number') {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._id === -1) {
			this._id = (
				await tx.userBilling.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.userBilling.update({
				where: { id: this._id },
				data: { ...this.nonRelationsToJSON() },
			})
		}

		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.address === undefined) {
			throw new Error('Missing field on _UserBilling.save(): address')
		}
		if (this.zipcode === undefined) {
			throw new Error('Missing field on _UserBilling.save(): zipcode')
		}
		if (this.city === undefined) {
			throw new Error('Missing field on _UserBilling.save(): city')
		}
		if (this.country === undefined) {
			throw new Error('Missing field on _UserBilling.save(): country')
		}
		if (this.region === undefined) {
			throw new Error('Missing field on _UserBilling.save(): region')
		}
		if (this.phone_number === undefined) {
			throw new Error(
				'Missing field on _UserBilling.save(): phone_number',
			)
		}

		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _UserBilling.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _UserBilling.prisma.deleteMany>[0],
	): Promise<boolean> {
		try {
			_UserBilling.prisma.deleteMany(query)
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}

	async delete(): Promise<boolean> {
		if (this.primaryKey === -1) return false

		try {
			this.prisma.delete({
				where: { id: this._id },
			})
		} catch (e) {
			console.log(e)
			return false
		}
		return true
	}
}
