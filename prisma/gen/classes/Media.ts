import { _User } from './User'
import { _Product } from './Product'
import { Prisma, User, Product } from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Media extends PrismaClass {
	static prisma: Prisma.MediaDelegate<undefined>
	get prisma(): Prisma.MediaDelegate<undefined> {
		return _Media.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.MediaInclude {
		if (deep <= 0) {
			return {
				user: true,
				product_image: true,
				product_gallery: true,
			}
		}

		return {
			user: { include: _User.getIncludes(deep - 1) },
			product_image: { include: _Product.getIncludes(deep - 1) },
			product_gallery: { include: _Product.getIncludes(deep - 1) },
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

	url?: string

	creation_date?: number

	modification_date?: number

	private _user_id: ForeignKey

	description?: string = ''

	name?: string

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

	private _product_image: RelationMany<_Product>
	public get product_image(): RelationMany<_Product> {
		return this._product_image
	}
	private set product_image(value: RelationMany<_Product>) {
		this._product_image = value
	}

	private _product_gallery: RelationMany<_Product>
	public get product_gallery(): RelationMany<_Product> {
		return this._product_gallery
	}
	private set product_gallery(value: RelationMany<_Product>) {
		this._product_gallery = value
	}

	constructor(obj: {
		id?: number
		url?: string
		creation_date?: number
		modification_date?: number
		user_id?: ForeignKey
		description?: string
		name?: string
		user?: _User | User | ForeignKey
		product_image?: _Product[] | Product[] | RelationMany<_Product>
		product_gallery?: _Product[] | Product[] | RelationMany<_Product>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Media>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.url = obj.url
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date
		this.description = obj.description !== undefined ? obj.description : ''
		this.name = obj.name

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

		if (!obj.product_image || obj.product_image.length === 0) {
			this.product_image = new RelationMany<_Product>([])
		} else if (obj.product_image instanceof RelationMany) {
			this.product_image = obj.product_image
		} else if (obj.product_image[0] instanceof _Product) {
			this.product_image = new RelationMany<_Product>(
				obj.product_image as _Product[],
			)
		} else {
			const product_imageArray: _Product[] = []
			for (const value of obj.product_image as Product[]) {
				product_imageArray.push(new _Product(value))
			}
			this.product_image = new RelationMany<_Product>(product_imageArray)
		}

		if (!obj.product_gallery || obj.product_gallery.length === 0) {
			this.product_gallery = new RelationMany<_Product>([])
		} else if (obj.product_gallery instanceof RelationMany) {
			this.product_gallery = obj.product_gallery
		} else if (obj.product_gallery[0] instanceof _Product) {
			this.product_gallery = new RelationMany<_Product>(
				obj.product_gallery as _Product[],
			)
		} else {
			const product_galleryArray: _Product[] = []
			for (const value of obj.product_gallery as Product[]) {
				product_galleryArray.push(new _Product(value))
			}
			this.product_gallery = new RelationMany<_Product>(
				product_galleryArray,
			)
		}
	}

	update(obj: {
		id?: number
		url?: string
		creation_date?: number
		modification_date?: number
		user_id?: ForeignKey
		description?: string
		name?: string
	}) {
		if (obj.url !== undefined) {
			this.url = obj.url
		}
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
		if (obj.description !== undefined) {
			this.description = obj.description
		}
		if (obj.name !== undefined) {
			this.name = obj.name
		}
	}

	toJSON() {
		return {
			id: this.id,
			url: this.url,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			user_id: this.user_id,
			description: this.description,
			name: this.name,
			user: this.user,
			product_image: this.product_image,
			product_gallery: this.product_gallery,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			url: this.url!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
			user_id: this.user_id!,
			description: this.description!,
			name: this.name!,
		}
	}

	static async all(query?: Prisma.MediaFindFirstArgsBase): Promise<_Media[]> {
		const models = await _Media.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Media(m))
			return acc
		}, [] as _Media[])
	}

	static async from(
		query?: Prisma.MediaFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Media | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Media.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Media.getIncludes()
			}
		}

		const dbQuery = await _Media.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Media(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Media.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Media.getIncludes(depth),
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
		if (typeof this.user !== 'number' && !this.user!.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		// Relations toMany
		const product_imageYield = this.product_image!.saveToTransaction(tx)
		await product_imageYield.next()
		saveYieldsArray.push(product_imageYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		const product_galleryConnections: Prisma.Enumerable<Prisma.ProductWhereUniqueInput> =
			[]
		for (const relation of this.product_gallery) {
			product_galleryConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.media.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						product_gallery: {
							connect: product_galleryConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.media.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					product_gallery: {
						connect: product_galleryConnections,
					},
				},
			})
		}

		this._saving = false
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.url === undefined) {
			throw new Error('Missing field on _Media.save(): url')
		}
		if (this.creation_date === undefined) {
			throw new Error('Missing field on _Media.save(): creation_date')
		}
		if (this.modification_date === undefined) {
			throw new Error('Missing field on _Media.save(): modification_date')
		}
		if (this.description === undefined) {
			throw new Error('Missing field on _Media.save(): description')
		}
		if (this.name === undefined) {
			throw new Error('Missing field on _Media.save(): name')
		}

		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _Media.")
		}

		if (this.product_image.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Media. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Media.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Media.prisma.deleteMany(query)).count
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
