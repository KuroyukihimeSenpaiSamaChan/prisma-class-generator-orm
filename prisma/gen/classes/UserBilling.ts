import { _User } from './User'
import { Prisma, User } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _UserBillingConstructor<
	userType extends ForeignKey | undefined = ForeignKey | undefined,
> = {
	id?: number
	address: string
	additional_address?: string | null
	zipcode: string
	city: string
	country: string
	region: string
	phone_number: string
	company_name?: string | null
} & (userType extends ForeignKey
	? {
			user_id: ForeignKey
			user?: User | _User
	  }
	: {
			user_id?: ForeignKey
			user: User | _User
	  })

export class _UserBilling implements PrismaClass {
	static prisma: Prisma.UserBillingDelegate<undefined>
	get prisma(): Prisma.UserBillingDelegate<undefined> {
		return _UserBilling.prisma
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
			  },
	): Prisma.UserBillingInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					user: true,
				}
			}
			return {
				user: { include: _User.getIncludes(param - 1) },
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

	address: string

	additional_address: string | null

	zipcode: string

	city: string

	country: string

	region: string

	phone_number: string

	company_name: string | null

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

	constructor(obj: _UserBillingConstructor) {
		this.init(obj)
	}

	private init(obj: _UserBillingConstructor) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.address = obj.address
		this.additional_address = obj.additional_address ?? null
		this.zipcode = obj.zipcode
		this.city = obj.city
		this.country = obj.country
		this.region = obj.region
		this.phone_number = obj.phone_number
		this.company_name = obj.company_name ?? null

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.user_id !== undefined) {
			this._user_id = obj.user_id
		} else throw new Error('Invalid constructor.')
	}

	update(obj: {
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
		includes: boolean = true,
	): Promise<_UserBilling | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _UserBilling.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _UserBilling.getIncludes()
			}
		}

		const dbQuery = await _UserBilling.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _UserBilling(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<
			Parameters<typeof _UserBilling.getIncludes>[0],
			number
		>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _UserBilling.getIncludes>[0], number>,
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
			const dbThis = await _UserBilling.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _UserBilling.getIncludes(param),
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
			throw new Error("user can't be null or undefined in _UserBilling.")
		}
	}

	static async deleteAll(
		query: Parameters<typeof _UserBilling.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _UserBilling.prisma.deleteMany(query)).count
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
