import { _Media } from './Media'
import { _TVAType } from './TVAType'
import { _User } from './User'
import { _ProductState } from './ProductState'
import { _ProductVisibilty } from './ProductVisibilty'
import { _ConditioningType } from './ConditioningType'
import { _SubOrder } from './SubOrder'
import { _ProductCategory } from './ProductCategory'
import {
	Prisma,
	Media,
	TVAType,
	User,
	ProductState,
	ProductVisibilty,
	ConditioningType,
	SubOrder,
	ProductCategory,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

export class _Product extends PrismaClass {
	static prisma: Prisma.ProductDelegate<undefined>
	get prisma(): Prisma.ProductDelegate<undefined> {
		return _Product.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	static getIncludes(deep: number = 0): Prisma.ProductInclude {
		if (deep <= 0) {
			return {
				media: true,
				tva_type: true,
				user: true,
				productState: true,
				productVisibilty: true,
				productConditioning: true,
				sub_orders: true,
				product_categories: true,
				gallery: true,
			}
		}

		return {
			media: { include: _Media.getIncludes(deep - 1) },
			tva_type: { include: _TVAType.getIncludes(deep - 1) },
			user: { include: _User.getIncludes(deep - 1) },
			productState: { include: _ProductState.getIncludes(deep - 1) },
			productVisibilty: {
				include: _ProductVisibilty.getIncludes(deep - 1),
			},
			productConditioning: {
				include: _ConditioningType.getIncludes(deep - 1),
			},
			sub_orders: { include: _SubOrder.getIncludes(deep - 1) },
			product_categories: {
				include: _ProductCategory.getIncludes(deep - 1),
			},
			gallery: { include: _Media.getIncludes(deep - 1) },
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

	private _vendor_id: ForeignKey

	private _state: ForeignKey = 1

	private _tva: ForeignKey

	product_name?: string

	vendor_sku?: string

	product_sku?: string

	price?: number

	price_promo?: number

	description?: string

	additional_description?: string | null

	backorder?: boolean

	linked_products?: string

	private _product_image: ForeignKey

	product_keywords?: string

	creation_date?: number

	modification_date?: number

	has_tva?: boolean

	private _visibility: ForeignKey = 1

	private _conditioningType: ForeignKey

	conditioningValue?: string

	private _media: _Media | null
	get media(): _Media | ForeignKey {
		return this._media ? this._media : this.product_image
	}
	set media(value: _Media | ForeignKey) {
		if (value instanceof _Media) {
			this._media = value
			this._product_image = value.id
		} else {
			this._media = null
			this._product_image = value
		}
	}
	get product_image(): ForeignKey {
		if (this._media === null) {
			return this._product_image
		} else {
			return this._media.primaryKey
		}
	}

	private _tva_type: _TVAType | null
	get tva_type(): _TVAType | ForeignKey {
		return this._tva_type ? this._tva_type : this.tva
	}
	set tva_type(value: _TVAType | ForeignKey) {
		if (value instanceof _TVAType) {
			this._tva_type = value
			this._tva = value.id
		} else {
			this._tva_type = null
			this._tva = value
		}
	}
	get tva(): ForeignKey {
		if (this._tva_type === null) {
			return this._tva
		} else {
			return this._tva_type.primaryKey
		}
	}

	private _user: _User | null
	get user(): _User | ForeignKey {
		return this._user ? this._user : this.vendor_id
	}
	set user(value: _User | ForeignKey) {
		if (value instanceof _User) {
			this._user = value
			this._vendor_id = value.id
		} else {
			this._user = null
			this._vendor_id = value
		}
	}
	get vendor_id(): ForeignKey {
		if (this._user === null) {
			return this._vendor_id
		} else {
			return this._user.primaryKey
		}
	}

	private _productState: _ProductState | null
	get productState(): _ProductState | ForeignKey {
		return this._productState ? this._productState : this.state
	}
	set productState(value: _ProductState | ForeignKey) {
		if (value instanceof _ProductState) {
			this._productState = value
			this._state = value.id
		} else {
			this._productState = null
			this._state = value
		}
	}
	get state(): ForeignKey {
		if (this._productState === null) {
			return this._state
		} else {
			return this._productState.primaryKey
		}
	}

	private _productVisibilty: _ProductVisibilty | null
	get productVisibilty(): _ProductVisibilty | ForeignKey {
		return this._productVisibilty ? this._productVisibilty : this.visibility
	}
	set productVisibilty(value: _ProductVisibilty | ForeignKey) {
		if (value instanceof _ProductVisibilty) {
			this._productVisibilty = value
			this._visibility = value.id
		} else {
			this._productVisibilty = null
			this._visibility = value
		}
	}
	get visibility(): ForeignKey {
		if (this._productVisibilty === null) {
			return this._visibility
		} else {
			return this._productVisibilty.primaryKey
		}
	}

	private _productConditioning: _ConditioningType | null
	get productConditioning(): _ConditioningType | ForeignKey {
		return this._productConditioning
			? this._productConditioning
			: this.conditioningType
	}
	set productConditioning(value: _ConditioningType | ForeignKey) {
		if (value instanceof _ConditioningType) {
			this._productConditioning = value
			this._conditioningType = value.id
		} else {
			this._productConditioning = null
			this._conditioningType = value
		}
	}
	get conditioningType(): ForeignKey {
		if (this._productConditioning === null) {
			return this._conditioningType
		} else {
			return this._productConditioning.primaryKey
		}
	}

	private _sub_orders: RelationMany<_SubOrder>
	public get sub_orders(): RelationMany<_SubOrder> {
		return this._sub_orders
	}
	private set sub_orders(value: RelationMany<_SubOrder>) {
		this._sub_orders = value
	}

	private _product_categories: RelationMany<_ProductCategory>
	public get product_categories(): RelationMany<_ProductCategory> {
		return this._product_categories
	}
	private set product_categories(value: RelationMany<_ProductCategory>) {
		this._product_categories = value
	}

	private _gallery: RelationMany<_Media>
	public get gallery(): RelationMany<_Media> {
		return this._gallery
	}
	private set gallery(value: RelationMany<_Media>) {
		this._gallery = value
	}

	constructor(obj: {
		id?: number
		vendor_id?: ForeignKey
		state?: ForeignKey
		tva?: ForeignKey
		product_name?: string
		vendor_sku?: string
		product_sku?: string
		price?: number
		price_promo?: number
		description?: string
		additional_description?: string | null
		backorder?: boolean
		linked_products?: string
		product_image?: ForeignKey
		product_keywords?: string
		creation_date?: number
		modification_date?: number
		has_tva?: boolean
		visibility?: ForeignKey
		conditioningType?: ForeignKey
		conditioningValue?: string
		media?: _Media | Media | ForeignKey
		tva_type?: _TVAType | TVAType | ForeignKey
		user?: _User | User | ForeignKey
		productState?: _ProductState | ProductState | ForeignKey
		productVisibilty?: _ProductVisibilty | ProductVisibilty | ForeignKey
		productConditioning?: _ConditioningType | ConditioningType | ForeignKey
		sub_orders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
		product_categories?:
			| _ProductCategory[]
			| ProductCategory[]
			| RelationMany<_ProductCategory>
		gallery?: _Media[] | Media[] | RelationMany<_Media>
	}) {
		super()
		this.init(obj)
	}

	private init(obj: ConstructorParameters<typeof _Product>[0]) {
		if (obj.id !== undefined) {
			this._id = obj.id
		}
		this.product_name = obj.product_name
		this.vendor_sku = obj.vendor_sku
		this.product_sku = obj.product_sku
		this.price = obj.price
		this.price_promo = obj.price_promo
		this.description = obj.description
		this.additional_description =
			obj.additional_description !== null
				? obj.additional_description
				: undefined
		this.backorder = obj.backorder
		this.linked_products = obj.linked_products
		this.product_keywords = obj.product_keywords
		this.creation_date = obj.creation_date
		this.modification_date = obj.modification_date
		this.has_tva = obj.has_tva
		this.conditioningValue = obj.conditioningValue

		if (!obj.media) {
			if (obj.product_image === undefined) {
				this.media = null
			} else {
				this.media = obj.product_image
			}
		} else if (obj.media instanceof _Media) {
			this.media = obj.media
		} else if (typeof obj.media === 'number') {
			this.media = obj.media
		} else {
			this.media = new _Media(obj.media)
		}

		if (!obj.tva_type) {
			if (obj.tva === undefined) {
				this.tva_type = null
			} else {
				this.tva_type = obj.tva
			}
		} else if (obj.tva_type instanceof _TVAType) {
			this.tva_type = obj.tva_type
		} else if (typeof obj.tva_type === 'number') {
			this.tva_type = obj.tva_type
		} else {
			this.tva_type = new _TVAType(obj.tva_type)
		}

		if (!obj.user) {
			if (obj.vendor_id === undefined) {
				this.user = null
			} else {
				this.user = obj.vendor_id
			}
		} else if (obj.user instanceof _User) {
			this.user = obj.user
		} else if (typeof obj.user === 'number') {
			this.user = obj.user
		} else {
			this.user = new _User(obj.user)
		}

		if (!obj.productState) {
			if (obj.state === undefined) {
				this.productState = null
			} else {
				this.productState = obj.state
			}
		} else if (obj.productState instanceof _ProductState) {
			this.productState = obj.productState
		} else if (typeof obj.productState === 'number') {
			this.productState = obj.productState
		} else {
			this.productState = new _ProductState(obj.productState)
		}

		if (!obj.productVisibilty) {
			if (obj.visibility === undefined) {
				this.productVisibilty = null
			} else {
				this.productVisibilty = obj.visibility
			}
		} else if (obj.productVisibilty instanceof _ProductVisibilty) {
			this.productVisibilty = obj.productVisibilty
		} else if (typeof obj.productVisibilty === 'number') {
			this.productVisibilty = obj.productVisibilty
		} else {
			this.productVisibilty = new _ProductVisibilty(obj.productVisibilty)
		}

		if (!obj.productConditioning) {
			if (obj.conditioningType === undefined) {
				this.productConditioning = null
			} else {
				this.productConditioning = obj.conditioningType
			}
		} else if (obj.productConditioning instanceof _ConditioningType) {
			this.productConditioning = obj.productConditioning
		} else if (typeof obj.productConditioning === 'number') {
			this.productConditioning = obj.productConditioning
		} else {
			this.productConditioning = new _ConditioningType(
				obj.productConditioning,
			)
		}

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

		if (!obj.product_categories || obj.product_categories.length === 0) {
			this.product_categories = new RelationMany<_ProductCategory>([])
		} else if (obj.product_categories instanceof RelationMany) {
			this.product_categories = obj.product_categories
		} else if (obj.product_categories[0] instanceof _ProductCategory) {
			this.product_categories = new RelationMany<_ProductCategory>(
				obj.product_categories as _ProductCategory[],
			)
		} else {
			const product_categoriesArray: _ProductCategory[] = []
			for (const value of obj.product_categories as ProductCategory[]) {
				product_categoriesArray.push(new _ProductCategory(value))
			}
			this.product_categories = new RelationMany<_ProductCategory>(
				product_categoriesArray,
			)
		}

		if (!obj.gallery || obj.gallery.length === 0) {
			this.gallery = new RelationMany<_Media>([])
		} else if (obj.gallery instanceof RelationMany) {
			this.gallery = obj.gallery
		} else if (obj.gallery[0] instanceof _Media) {
			this.gallery = new RelationMany<_Media>(obj.gallery as _Media[])
		} else {
			const galleryArray: _Media[] = []
			for (const value of obj.gallery as Media[]) {
				galleryArray.push(new _Media(value))
			}
			this.gallery = new RelationMany<_Media>(galleryArray)
		}
	}

	update(obj: {
		id?: number
		vendor_id?: ForeignKey
		state?: ForeignKey
		tva?: ForeignKey
		product_name?: string
		vendor_sku?: string
		product_sku?: string
		price?: number
		price_promo?: number
		description?: string
		additional_description?: string | null
		backorder?: boolean
		linked_products?: string
		product_image?: ForeignKey
		product_keywords?: string
		creation_date?: number
		modification_date?: number
		has_tva?: boolean
		visibility?: ForeignKey
		conditioningType?: ForeignKey
		conditioningValue?: string
	}) {
		if (obj.product_name !== undefined) {
			this.product_name = obj.product_name
		}
		if (obj.vendor_sku !== undefined) {
			this.vendor_sku = obj.vendor_sku
		}
		if (obj.product_sku !== undefined) {
			this.product_sku = obj.product_sku
		}
		if (obj.price !== undefined) {
			this.price = obj.price
		}
		if (obj.price_promo !== undefined) {
			this.price_promo = obj.price_promo
		}
		if (obj.description !== undefined) {
			this.description = obj.description
		}
		if (obj.additional_description !== undefined) {
			this.additional_description = obj.additional_description
		}
		if (obj.backorder !== undefined) {
			this.backorder = obj.backorder
		}
		if (obj.linked_products !== undefined) {
			this.linked_products = obj.linked_products
		}
		if (obj.product_keywords !== undefined) {
			this.product_keywords = obj.product_keywords
		}
		if (obj.creation_date !== undefined) {
			this.creation_date = obj.creation_date
		}
		if (obj.modification_date !== undefined) {
			this.modification_date = obj.modification_date
		}
		if (obj.has_tva !== undefined) {
			this.has_tva = obj.has_tva
		}
		if (obj.conditioningValue !== undefined) {
			this.conditioningValue = obj.conditioningValue
		}
	}

	toJSON() {
		return {
			id: this.id,
			vendor_id: this.vendor_id,
			state: this.state,
			tva: this.tva,
			product_name: this.product_name,
			vendor_sku: this.vendor_sku,
			product_sku: this.product_sku,
			price: this.price,
			price_promo: this.price_promo,
			description: this.description,
			additional_description: this.additional_description,
			backorder: this.backorder,
			linked_products: this.linked_products,
			product_image: this.product_image,
			product_keywords: this.product_keywords,
			creation_date: this.creation_date,
			modification_date: this.modification_date,
			has_tva: this.has_tva,
			visibility: this.visibility,
			conditioningType: this.conditioningType,
			conditioningValue: this.conditioningValue,
			media: this.media,
			tva_type: this.tva_type,
			user: this.user,
			productState: this.productState,
			productVisibilty: this.productVisibilty,
			productConditioning: this.productConditioning,
			sub_orders: this.sub_orders,
			product_categories: this.product_categories,
			gallery: this.gallery,
		}
	}
	nonRelationsToJSON() {
		return {
			id: this.id!,
			vendor_id: this.vendor_id!,
			state: this.state!,
			tva: this.tva!,
			product_name: this.product_name!,
			vendor_sku: this.vendor_sku!,
			product_sku: this.product_sku!,
			price: this.price!,
			price_promo: this.price_promo!,
			description: this.description!,
			additional_description: this.additional_description!,
			backorder: this.backorder!,
			linked_products: this.linked_products!,
			product_image: this.product_image!,
			product_keywords: this.product_keywords!,
			creation_date: this.creation_date!,
			modification_date: this.modification_date!,
			has_tva: this.has_tva!,
			visibility: this.visibility!,
			conditioningType: this.conditioningType!,
			conditioningValue: this.conditioningValue!,
		}
	}

	static async all(
		query?: Prisma.ProductFindFirstArgsBase,
	): Promise<_Product[]> {
		const models = await _Product.prisma.findMany(query)

		return models.reduce((acc, m) => {
			acc.push(new _Product(m))
			return acc
		}, [] as _Product[])
	}

	static async from(
		query?: Prisma.ProductFindFirstArgsBase,
		includes: boolean = true,
	): Promise<_Product | null> {
		if (includes) {
			if (query === undefined) {
				query = {
					include: _Product.getIncludes(),
				}
			} else if (
				query.include === undefined &&
				query.select === undefined
			) {
				query.include = _Product.getIncludes()
			}
		}

		const dbQuery = await _Product.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Product(dbQuery)
	}

	async load(depth: number = 0) {
		if (depth < 0) return

		if (this.id !== -1) {
			const dbThis = await _Product.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Product.getIncludes(depth),
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
		if (typeof this.media !== 'number') {
			const mediaYield = this.media!.saveToTransaction(tx)
			await mediaYield.next()
			saveYieldsArray.push(mediaYield)
		}

		if (typeof this.tva_type !== 'number') {
			const tva_typeYield = this.tva_type!.saveToTransaction(tx)
			await tva_typeYield.next()
			saveYieldsArray.push(tva_typeYield)
		}

		if (typeof this.user !== 'number') {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		if (typeof this.productState !== 'number') {
			const productStateYield = this.productState!.saveToTransaction(tx)
			await productStateYield.next()
			saveYieldsArray.push(productStateYield)
		}

		if (typeof this.productVisibilty !== 'number') {
			const productVisibiltyYield =
				this.productVisibilty!.saveToTransaction(tx)
			await productVisibiltyYield.next()
			saveYieldsArray.push(productVisibiltyYield)
		}

		if (typeof this.productConditioning !== 'number') {
			const productConditioningYield =
				this.productConditioning!.saveToTransaction(tx)
			await productConditioningYield.next()
			saveYieldsArray.push(productConditioningYield)
		}

		// Relations toMany
		const sub_ordersYield = this.sub_orders!.saveToTransaction(tx)
		await sub_ordersYield.next()
		saveYieldsArray.push(sub_ordersYield)

		const product_categoriesYield =
			this.product_categories!.saveToTransaction(tx)
		await product_categoriesYield.next()
		saveYieldsArray.push(product_categoriesYield)

		const galleryYield = this.gallery!.saveToTransaction(tx)
		await galleryYield.next()
		saveYieldsArray.push(galleryYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		const product_categoriesConnections: Prisma.Enumerable<Prisma.ProductCategoryWhereUniqueInput> =
			[]
		for (const relation of this.product_categories) {
			product_categoriesConnections.push({
				id: relation.primaryKey,
			})
		}
		const galleryConnections: Prisma.Enumerable<Prisma.MediaWhereUniqueInput> =
			[]
		for (const relation of this.gallery) {
			galleryConnections.push({
				id: relation.primaryKey,
			})
		}

		if (this._id === -1) {
			this._id = (
				await tx.product.create({
					data: {
						...this.nonRelationsToJSON(),
						id: undefined,
						product_categories: {
							connect: product_categoriesConnections,
						},
						gallery: {
							connect: galleryConnections,
						},
					},
					select: { id: true },
				})
			).id
		} else {
			await tx.product.update({
				where: { id: this._id },
				data: {
					...this.nonRelationsToJSON(),
					product_categories: {
						connect: product_categoriesConnections,
					},
					gallery: {
						connect: galleryConnections,
					},
				},
			})
		}

		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.product_name === undefined) {
			throw new Error('Missing field on _Product.save(): product_name')
		}
		if (this.vendor_sku === undefined) {
			throw new Error('Missing field on _Product.save(): vendor_sku')
		}
		if (this.product_sku === undefined) {
			throw new Error('Missing field on _Product.save(): product_sku')
		}
		if (this.price === undefined) {
			throw new Error('Missing field on _Product.save(): price')
		}
		if (this.price_promo === undefined) {
			throw new Error('Missing field on _Product.save(): price_promo')
		}
		if (this.description === undefined) {
			throw new Error('Missing field on _Product.save(): description')
		}
		if (this.backorder === undefined) {
			throw new Error('Missing field on _Product.save(): backorder')
		}
		if (this.linked_products === undefined) {
			throw new Error('Missing field on _Product.save(): linked_products')
		}
		if (this.product_keywords === undefined) {
			throw new Error(
				'Missing field on _Product.save(): product_keywords',
			)
		}
		if (this.creation_date === undefined) {
			throw new Error('Missing field on _Product.save(): creation_date')
		}
		if (this.modification_date === undefined) {
			throw new Error(
				'Missing field on _Product.save(): modification_date',
			)
		}
		if (this.has_tva === undefined) {
			throw new Error('Missing field on _Product.save(): has_tva')
		}
		if (this.conditioningValue === undefined) {
			throw new Error(
				'Missing field on _Product.save(): conditioningValue',
			)
		}

		if (this.media === undefined || this.media === null) {
			throw new Error("media can't be null or undefined in _Product.")
		}
		if (this.tva_type === undefined || this.tva_type === null) {
			throw new Error("tva_type can't be null or undefined in _Product.")
		}
		if (this.user === undefined || this.user === null) {
			throw new Error("user can't be null or undefined in _Product.")
		}
		if (this.productState === undefined || this.productState === null) {
			throw new Error(
				"productState can't be null or undefined in _Product.",
			)
		}
		if (
			this.productVisibilty === undefined ||
			this.productVisibilty === null
		) {
			throw new Error(
				"productVisibilty can't be null or undefined in _Product.",
			)
		}
		if (
			this.productConditioning === undefined ||
			this.productConditioning === null
		) {
			throw new Error(
				"productConditioning can't be null or undefined in _Product.",
			)
		}

		if (this.sub_orders.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Product. Save it first, then add the toMany fields",
			)
		}
		if (this.product_categories.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Product. Save it first, then add the toMany fields",
			)
		}
		if (this.gallery.length() > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Product. Save it first, then add the toMany fields",
			)
		}
	}

	static async deleteAll(
		query: Parameters<typeof _Product.prisma.deleteMany>[0],
	): Promise<false | number> {
		let count: number
		try {
			count = (await _Product.prisma.deleteMany(query)).count
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
