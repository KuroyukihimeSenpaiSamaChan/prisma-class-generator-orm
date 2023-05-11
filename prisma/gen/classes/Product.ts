import { _CartProduct } from './CartProduct'
import { _ConditioningType } from './ConditioningType'
import { _Media } from './Media'
import { _ProductState } from './ProductState'
import { _TVAType } from './TVAType'
import { _User } from './User'
import { _ProductVisibility } from './ProductVisibility'
import { _SubOrder } from './SubOrder'
import { _ProductCategory } from './ProductCategory'
import {
	Prisma,
	CartProduct,
	ConditioningType,
	Media,
	ProductState,
	TVAType,
	User,
	ProductVisibility,
	SubOrder,
	ProductCategory,
} from '@prisma/client'
import { RelationMany } from '../prisma-relation'
import { PrismaClass, ForeignKey } from '../prisma-class'
import { PrismaModel } from '../prisma-model'

type _ProductConstructor<
	productConditioningType extends ForeignKey | undefined =
		| ForeignKey
		| undefined,
	mediaType extends ForeignKey | undefined = ForeignKey | undefined,
	productStateType extends ForeignKey | undefined = ForeignKey | undefined,
	tva_typeType extends ForeignKey | undefined = ForeignKey | undefined,
	userType extends ForeignKey | undefined = ForeignKey | undefined,
	productVisibiltyType extends ForeignKey | undefined =
		| ForeignKey
		| undefined,
> = {
	id?: number
	product_name: string
	vendor_sku: string
	product_sku: string
	price: number
	price_promo: number
	description: string
	additional_description?: string | null
	backorder: boolean
	linked_products: string
	product_keywords: string
	creation_date: number
	modification_date: number
	has_tva: boolean
	conditioningValue: string
	dimensions?: string
	marque?: string
	slug: string
	state_description?: string
	quantity?: number
	weight?: number
	basketProducts?: _CartProduct[] | CartProduct[] | RelationMany<_CartProduct>
	subOrders?: _SubOrder[] | SubOrder[] | RelationMany<_SubOrder>
	product_categories?:
		| _ProductCategory[]
		| ProductCategory[]
		| RelationMany<_ProductCategory>
	gallery?: _Media[] | Media[] | RelationMany<_Media>
} & (productConditioningType extends ForeignKey
	? {
			conditioningType: ForeignKey
			productConditioning?: ConditioningType | _ConditioningType
	  }
	: {
			conditioningType?: ForeignKey
			productConditioning: ConditioningType | _ConditioningType
	  }) &
	(mediaType extends ForeignKey
		? {
				product_image: ForeignKey
				media?: Media | _Media
		  }
		: {
				product_image?: ForeignKey
				media: Media | _Media
		  }) &
	(productStateType extends ForeignKey
		? {
				state: ForeignKey
				productState?: ProductState | _ProductState
		  }
		: {
				state?: ForeignKey
				productState: ProductState | _ProductState
		  }) &
	(tva_typeType extends ForeignKey
		? {
				tva: ForeignKey
				tva_type?: TVAType | _TVAType
		  }
		: {
				tva?: ForeignKey
				tva_type: TVAType | _TVAType
		  }) &
	(userType extends ForeignKey
		? {
				vendor_id: ForeignKey
				user?: User | _User
		  }
		: {
				vendor_id?: ForeignKey
				user: User | _User
		  }) &
	(productVisibiltyType extends ForeignKey
		? {
				visibility: ForeignKey
				productVisibilty?: ProductVisibility | _ProductVisibility
		  }
		: {
				visibility?: ForeignKey
				productVisibilty: ProductVisibility | _ProductVisibility
		  })

export class _Product implements PrismaClass {
	static prisma: Prisma.ProductDelegate<undefined>
	get prisma(): Prisma.ProductDelegate<undefined> {
		return _Product.prisma
	}
	get prismaClient() {
		return PrismaModel.prismaClient
	}

	private _isSaved = false
	get isSaved(): boolean {
		return this._isSaved
	}

	static getIncludes(
		param?:
			| number
			| {
					basketProducts?:
						| boolean
						| Exclude<
								Parameters<typeof _CartProduct.getIncludes>[0],
								number
						  >
					productConditioning?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ConditioningType.getIncludes
								>[0],
								number
						  >
					media?:
						| boolean
						| Exclude<
								Parameters<typeof _Media.getIncludes>[0],
								number
						  >
					productState?:
						| boolean
						| Exclude<
								Parameters<typeof _ProductState.getIncludes>[0],
								number
						  >
					tva_type?:
						| boolean
						| Exclude<
								Parameters<typeof _TVAType.getIncludes>[0],
								number
						  >
					user?:
						| boolean
						| Exclude<
								Parameters<typeof _User.getIncludes>[0],
								number
						  >
					productVisibilty?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ProductVisibility.getIncludes
								>[0],
								number
						  >
					subOrders?:
						| boolean
						| Exclude<
								Parameters<typeof _SubOrder.getIncludes>[0],
								number
						  >
					product_categories?:
						| boolean
						| Exclude<
								Parameters<
									typeof _ProductCategory.getIncludes
								>[0],
								number
						  >
					gallery?:
						| boolean
						| Exclude<
								Parameters<typeof _Media.getIncludes>[0],
								number
						  >
			  },
	): Prisma.ProductInclude {
		if (param === undefined) {
			param = 0
		}

		if (typeof param === 'number') {
			if (param <= 0) {
				return {
					basketProducts: true,
					productConditioning: true,
					media: true,
					productState: true,
					tva_type: true,
					user: true,
					productVisibilty: true,
					subOrders: true,
					product_categories: true,
					gallery: true,
				}
			}
			return {
				basketProducts: {
					include: _CartProduct.getIncludes(param - 1),
				},
				productConditioning: {
					include: _ConditioningType.getIncludes(param - 1),
				},
				media: { include: _Media.getIncludes(param - 1) },
				productState: { include: _ProductState.getIncludes(param - 1) },
				tva_type: { include: _TVAType.getIncludes(param - 1) },
				user: { include: _User.getIncludes(param - 1) },
				productVisibilty: {
					include: _ProductVisibility.getIncludes(param - 1),
				},
				subOrders: { include: _SubOrder.getIncludes(param - 1) },
				product_categories: {
					include: _ProductCategory.getIncludes(param - 1),
				},
				gallery: { include: _Media.getIncludes(param - 1) },
			}
		} else {
			if (Object.keys(param).length === 0) {
				return {}
			}

			const query = {
				basketProducts: Object.keys(param).includes('basketProducts')
					? typeof param.basketProducts === 'boolean'
						? true
						: {
								include: _CartProduct.getIncludes(
									param.basketProducts,
								),
						  }
					: undefined,
				productConditioning: Object.keys(param).includes(
					'productConditioning',
				)
					? typeof param.productConditioning === 'boolean'
						? true
						: {
								include: _ConditioningType.getIncludes(
									param.productConditioning,
								),
						  }
					: undefined,
				media: Object.keys(param).includes('media')
					? typeof param.media === 'boolean'
						? true
						: {
								include: _Media.getIncludes(param.media),
						  }
					: undefined,
				productState: Object.keys(param).includes('productState')
					? typeof param.productState === 'boolean'
						? true
						: {
								include: _ProductState.getIncludes(
									param.productState,
								),
						  }
					: undefined,
				tva_type: Object.keys(param).includes('tva_type')
					? typeof param.tva_type === 'boolean'
						? true
						: {
								include: _TVAType.getIncludes(param.tva_type),
						  }
					: undefined,
				user: Object.keys(param).includes('user')
					? typeof param.user === 'boolean'
						? true
						: {
								include: _User.getIncludes(param.user),
						  }
					: undefined,
				productVisibilty: Object.keys(param).includes(
					'productVisibilty',
				)
					? typeof param.productVisibilty === 'boolean'
						? true
						: {
								include: _ProductVisibility.getIncludes(
									param.productVisibilty,
								),
						  }
					: undefined,
				subOrders: Object.keys(param).includes('subOrders')
					? typeof param.subOrders === 'boolean'
						? true
						: {
								include: _SubOrder.getIncludes(param.subOrders),
						  }
					: undefined,
				product_categories: Object.keys(param).includes(
					'product_categories',
				)
					? typeof param.product_categories === 'boolean'
						? true
						: {
								include: _ProductCategory.getIncludes(
									param.product_categories,
								),
						  }
					: undefined,
				gallery: Object.keys(param).includes('gallery')
					? typeof param.gallery === 'boolean'
						? true
						: {
								include: _Media.getIncludes(param.gallery),
						  }
					: undefined,
			}

			// @ts-ignore
			Object.keys(query).forEach(
				(key) =>
					query[key as keyof typeof query] === undefined &&
					delete query[key as keyof typeof query],
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

	private _vendor_id: ForeignKey
	set vendor_id(value: ForeignKey) {
		this._vendor_id = value
		this._isSaved = false
	}

	private _state: ForeignKey = 1
	set state(value: ForeignKey) {
		this._state = value
		this._isSaved = false
	}

	private _tva: ForeignKey
	set tva(value: ForeignKey) {
		this._tva = value
		this._isSaved = false
	}

	private _product_name: string
	set product_name(value: string) {
		this._product_name = value
		this._isSaved = false
	}
	get product_name(): string {
		return this._product_name
	}

	private _vendor_sku: string
	set vendor_sku(value: string) {
		this._vendor_sku = value
		this._isSaved = false
	}
	get vendor_sku(): string {
		return this._vendor_sku
	}

	private _product_sku: string
	set product_sku(value: string) {
		this._product_sku = value
		this._isSaved = false
	}
	get product_sku(): string {
		return this._product_sku
	}

	private _price: number
	set price(value: number) {
		this._price = value
		this._isSaved = false
	}
	get price(): number {
		return this._price
	}

	private _price_promo: number
	set price_promo(value: number) {
		this._price_promo = value
		this._isSaved = false
	}
	get price_promo(): number {
		return this._price_promo
	}

	private _description: string
	set description(value: string) {
		this._description = value
		this._isSaved = false
	}
	get description(): string {
		return this._description
	}

	private _additional_description: string | null
	set additional_description(value: string | null) {
		this._additional_description = value
		this._isSaved = false
	}
	get additional_description(): string | null {
		return this._additional_description
	}

	private _backorder: boolean
	set backorder(value: boolean) {
		this._backorder = value
		this._isSaved = false
	}
	get backorder(): boolean {
		return this._backorder
	}

	private _linked_products: string
	set linked_products(value: string) {
		this._linked_products = value
		this._isSaved = false
	}
	get linked_products(): string {
		return this._linked_products
	}

	private _product_image: ForeignKey
	set product_image(value: ForeignKey) {
		this._product_image = value
		this._isSaved = false
	}

	private _product_keywords: string
	set product_keywords(value: string) {
		this._product_keywords = value
		this._isSaved = false
	}
	get product_keywords(): string {
		return this._product_keywords
	}

	private _creation_date: number
	set creation_date(value: number) {
		this._creation_date = value
		this._isSaved = false
	}
	get creation_date(): number {
		return this._creation_date
	}

	private _modification_date: number
	set modification_date(value: number) {
		this._modification_date = value
		this._isSaved = false
	}
	get modification_date(): number {
		return this._modification_date
	}

	private _has_tva: boolean
	set has_tva(value: boolean) {
		this._has_tva = value
		this._isSaved = false
	}
	get has_tva(): boolean {
		return this._has_tva
	}

	private _visibility: ForeignKey = 1
	set visibility(value: ForeignKey) {
		this._visibility = value
		this._isSaved = false
	}

	private _conditioningType: ForeignKey
	set conditioningType(value: ForeignKey) {
		this._conditioningType = value
		this._isSaved = false
	}

	private _conditioningValue: string
	set conditioningValue(value: string) {
		this._conditioningValue = value
		this._isSaved = false
	}
	get conditioningValue(): string {
		return this._conditioningValue
	}

	private _dimensions: string = '0x0x0'
	set dimensions(value: string) {
		this._dimensions = value
		this._isSaved = false
	}
	get dimensions(): string {
		return this._dimensions
	}

	private _marque: string = ''
	set marque(value: string) {
		this._marque = value
		this._isSaved = false
	}
	get marque(): string {
		return this._marque
	}

	private _slug: string
	set slug(value: string) {
		this._slug = value
		this._isSaved = false
	}
	get slug(): string {
		return this._slug
	}

	private _state_description: string = ''
	set state_description(value: string) {
		this._state_description = value
		this._isSaved = false
	}
	get state_description(): string {
		return this._state_description
	}

	private _quantity: number = 0
	set quantity(value: number) {
		this._quantity = value
		this._isSaved = false
	}
	get quantity(): number {
		return this._quantity
	}

	private _weight: number = 0
	set weight(value: number) {
		this._weight = value
		this._isSaved = false
	}
	get weight(): number {
		return this._weight
	}

	private _basketProducts: RelationMany<_CartProduct>
	public get basketProducts(): RelationMany<_CartProduct> {
		return this._basketProducts
	}
	private set basketProducts(value: RelationMany<_CartProduct>) {
		this._basketProducts = value
		this._isSaved = false
	}

	private _productConditioning: _ConditioningType
	get productConditioning(): _ConditioningType {
		return this._productConditioning
	}
	set productConditioning(value: _ConditioningType) {
		this._productConditioning = value
		this._conditioningType = value.id
		this._isSaved = false
	}
	get conditioningType(): ForeignKey {
		if (!this._productConditioning) {
			return this._conditioningType
		} else {
			return this._productConditioning.primaryKey
		}
	}

	private _media: _Media
	get media(): _Media {
		return this._media
	}
	set media(value: _Media) {
		this._media = value
		this._product_image = value.id
		this._isSaved = false
	}
	get product_image(): ForeignKey {
		if (!this._media) {
			return this._product_image
		} else {
			return this._media.primaryKey
		}
	}

	private _productState: _ProductState
	get productState(): _ProductState {
		return this._productState
	}
	set productState(value: _ProductState) {
		this._productState = value
		this._state = value.id
		this._isSaved = false
	}
	get state(): ForeignKey {
		if (!this._productState) {
			return this._state
		} else {
			return this._productState.primaryKey
		}
	}

	private _tva_type: _TVAType
	get tva_type(): _TVAType {
		return this._tva_type
	}
	set tva_type(value: _TVAType) {
		this._tva_type = value
		this._tva = value.id
		this._isSaved = false
	}
	get tva(): ForeignKey {
		if (!this._tva_type) {
			return this._tva
		} else {
			return this._tva_type.primaryKey
		}
	}

	private _user: _User
	get user(): _User {
		return this._user
	}
	set user(value: _User) {
		this._user = value
		this._vendor_id = value.id
		this._isSaved = false
	}
	get vendor_id(): ForeignKey {
		if (!this._user) {
			return this._vendor_id
		} else {
			return this._user.primaryKey
		}
	}

	private _productVisibilty: _ProductVisibility
	get productVisibilty(): _ProductVisibility {
		return this._productVisibilty
	}
	set productVisibilty(value: _ProductVisibility) {
		this._productVisibilty = value
		this._visibility = value.id
		this._isSaved = false
	}
	get visibility(): ForeignKey {
		if (!this._productVisibilty) {
			return this._visibility
		} else {
			return this._productVisibilty.primaryKey
		}
	}

	private _subOrders: RelationMany<_SubOrder>
	public get subOrders(): RelationMany<_SubOrder> {
		return this._subOrders
	}
	private set subOrders(value: RelationMany<_SubOrder>) {
		this._subOrders = value
		this._isSaved = false
	}

	private _product_categories: RelationMany<_ProductCategory>
	public get product_categories(): RelationMany<_ProductCategory> {
		return this._product_categories
	}
	private set product_categories(value: RelationMany<_ProductCategory>) {
		this._product_categories = value
		this._isSaved = false
	}

	private _gallery: RelationMany<_Media>
	public get gallery(): RelationMany<_Media> {
		return this._gallery
	}
	private set gallery(value: RelationMany<_Media>) {
		this._gallery = value
		this._isSaved = false
	}

	constructor(obj: _ProductConstructor) {
		this.init(obj)
	}

	private init(obj: _ProductConstructor) {
		this._product_name = obj.product_name
		this._vendor_sku = obj.vendor_sku
		this._product_sku = obj.product_sku
		this._price = obj.price
		this._price_promo = obj.price_promo
		this._description = obj.description
		this._additional_description = obj.additional_description ?? null
		this._backorder = obj.backorder
		this._linked_products = obj.linked_products
		this._product_keywords = obj.product_keywords
		this._creation_date = obj.creation_date
		this._modification_date = obj.modification_date
		this._has_tva = obj.has_tva
		this._conditioningValue = obj.conditioningValue
		this._dimensions = obj.dimensions ?? '0x0x0'
		this._marque = obj.marque ?? ''
		this._slug = obj.slug
		this._state_description = obj.state_description ?? ''
		this._quantity = obj.quantity ?? 0
		this._weight = obj.weight ?? 0

		if (obj.productConditioning !== undefined) {
			if (obj.productConditioning instanceof _ConditioningType) {
				this.productConditioning = obj.productConditioning
			} else {
				this.productConditioning = new _ConditioningType(
					obj.productConditioning,
				)
			}
		} else if (obj.conditioningType !== undefined) {
			this._conditioningType = obj.conditioningType
		} else throw new Error('Invalid constructor.')

		if (obj.media !== undefined) {
			if (obj.media instanceof _Media) {
				this.media = obj.media
			} else {
				this.media = new _Media(obj.media)
			}
		} else if (obj.product_image !== undefined) {
			this._product_image = obj.product_image
		} else throw new Error('Invalid constructor.')

		if (obj.productState !== undefined) {
			if (obj.productState instanceof _ProductState) {
				this.productState = obj.productState
			} else {
				this.productState = new _ProductState(obj.productState)
			}
		} else if (obj.state !== undefined) {
			this._state = obj.state
		} else throw new Error('Invalid constructor.')

		if (obj.tva_type !== undefined) {
			if (obj.tva_type instanceof _TVAType) {
				this.tva_type = obj.tva_type
			} else {
				this.tva_type = new _TVAType(obj.tva_type)
			}
		} else if (obj.tva !== undefined) {
			this._tva = obj.tva
		} else throw new Error('Invalid constructor.')

		if (obj.user !== undefined) {
			if (obj.user instanceof _User) {
				this.user = obj.user
			} else {
				this.user = new _User(obj.user)
			}
		} else if (obj.vendor_id !== undefined) {
			this._vendor_id = obj.vendor_id
		} else throw new Error('Invalid constructor.')

		if (obj.productVisibilty !== undefined) {
			if (obj.productVisibilty instanceof _ProductVisibility) {
				this.productVisibilty = obj.productVisibilty
			} else {
				this.productVisibilty = new _ProductVisibility(
					obj.productVisibilty,
				)
			}
		} else if (obj.visibility !== undefined) {
			this._visibility = obj.visibility
		} else throw new Error('Invalid constructor.')

		if (!obj.basketProducts || obj.basketProducts.length === 0) {
			this.basketProducts = new RelationMany<_CartProduct>()
		} else if (obj.basketProducts instanceof RelationMany) {
			this.basketProducts = obj.basketProducts
		} else if (obj.basketProducts[0] instanceof _CartProduct) {
			this.basketProducts = new RelationMany<_CartProduct>(
				obj.basketProducts as _CartProduct[],
			)
		} else {
			const basketProductsArray: _CartProduct[] = []
			for (const value of obj.basketProducts as CartProduct[]) {
				basketProductsArray.push(new _CartProduct(value))
			}
			this.basketProducts = new RelationMany<_CartProduct>(
				basketProductsArray,
			)
		}

		if (!obj.subOrders || obj.subOrders.length === 0) {
			this.subOrders = new RelationMany<_SubOrder>()
		} else if (obj.subOrders instanceof RelationMany) {
			this.subOrders = obj.subOrders
		} else if (obj.subOrders[0] instanceof _SubOrder) {
			this.subOrders = new RelationMany<_SubOrder>(
				obj.subOrders as _SubOrder[],
			)
		} else {
			const subOrdersArray: _SubOrder[] = []
			for (const value of obj.subOrders as SubOrder[]) {
				subOrdersArray.push(new _SubOrder(value))
			}
			this.subOrders = new RelationMany<_SubOrder>(subOrdersArray)
		}

		if (!obj.product_categories || obj.product_categories.length === 0) {
			this.product_categories = new RelationMany<_ProductCategory>()
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
			this.gallery = new RelationMany<_Media>()
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

		if (obj.id !== undefined) {
			this._id = obj.id
			this._isSaved = true
		}
	}

	update(obj: {
		product_name?: string
		vendor_sku?: string
		product_sku?: string
		price?: number
		price_promo?: number
		description?: string
		additional_description?: string | null
		backorder?: boolean
		linked_products?: string
		product_keywords?: string
		creation_date?: number
		modification_date?: number
		has_tva?: boolean
		conditioningValue?: string
		dimensions?: string
		marque?: string
		slug?: string
		state_description?: string
		quantity?: number
		weight?: number
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
		if (obj.dimensions !== undefined) {
			this.dimensions = obj.dimensions
		}
		if (obj.marque !== undefined) {
			this.marque = obj.marque
		}
		if (obj.slug !== undefined) {
			this.slug = obj.slug
		}
		if (obj.state_description !== undefined) {
			this.state_description = obj.state_description
		}
		if (obj.quantity !== undefined) {
			this.quantity = obj.quantity
		}
		if (obj.weight !== undefined) {
			this.weight = obj.weight
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
			dimensions: this.dimensions,
			marque: this.marque,
			slug: this.slug,
			state_description: this.state_description,
			quantity: this.quantity,
			weight: this.weight,
			basketProducts: this.basketProducts,
			productConditioning: this.productConditioning,
			media: this.media,
			productState: this.productState,
			tva_type: this.tva_type,
			user: this.user,
			productVisibilty: this.productVisibilty,
			subOrders: this.subOrders,
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
			dimensions: this.dimensions!,
			marque: this.marque!,
			slug: this.slug!,
			state_description: this.state_description!,
			quantity: this.quantity!,
			weight: this.weight!,
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
	): Promise<_Product | null> {
		const dbQuery = await _Product.prisma.findFirst({
			...query,
		})

		if (dbQuery === null) return null

		return new _Product(dbQuery)
	}

	async load(depth?: number): Promise<void>
	async load(
		filter?: Exclude<Parameters<typeof _Product.getIncludes>[0], number>,
	): Promise<void>
	async load(
		param?:
			| number
			| Exclude<Parameters<typeof _Product.getIncludes>[0], number>,
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
			const dbThis = await _Product.prisma.findUnique({
				where: {
					id: this.id,
				},
				select: _Product.getIncludes(param),
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
		if (this.productConditioning && !this.productConditioning.saving) {
			const productConditioningYield =
				this.productConditioning!.saveToTransaction(tx)
			await productConditioningYield.next()
			saveYieldsArray.push(productConditioningYield)
		}

		if (this.media && !this.media.saving) {
			const mediaYield = this.media!.saveToTransaction(tx)
			await mediaYield.next()
			saveYieldsArray.push(mediaYield)
		}

		if (this.productState && !this.productState.saving) {
			const productStateYield = this.productState!.saveToTransaction(tx)
			await productStateYield.next()
			saveYieldsArray.push(productStateYield)
		}

		if (this.tva_type && !this.tva_type.saving) {
			const tva_typeYield = this.tva_type!.saveToTransaction(tx)
			await tva_typeYield.next()
			saveYieldsArray.push(tva_typeYield)
		}

		if (this.user && !this.user.saving) {
			const userYield = this.user!.saveToTransaction(tx)
			await userYield.next()
			saveYieldsArray.push(userYield)
		}

		if (this.productVisibilty && !this.productVisibilty.saving) {
			const productVisibiltyYield =
				this.productVisibilty!.saveToTransaction(tx)
			await productVisibiltyYield.next()
			saveYieldsArray.push(productVisibiltyYield)
		}

		// Relations toMany
		const basketProductsYield = this.basketProducts!.saveToTransaction(tx)
		await basketProductsYield.next()
		saveYieldsArray.push(basketProductsYield)

		const subOrdersYield = this.subOrders!.saveToTransaction(tx)
		await subOrdersYield.next()
		saveYieldsArray.push(subOrdersYield)

		yield new Promise<number>((resolve) => resolve(0))

		for (const saveYield of saveYieldsArray) {
			await saveYield.next()
		}

		if (this._isSaved) {
			this._saving = false
			return new Promise<number>((resolve) => resolve(this._id))
		}

		const product_categoriesConnections: Prisma.Enumerable<Prisma.ProductCategoryWhereUniqueInput> =
			[]
		for (const relation of this.product_categories) {
			product_categoriesConnections.push({
				id: relation.primaryKey,
			})
		}
		const product_categoriesDisconnections: Prisma.Enumerable<Prisma.ProductCategoryWhereUniqueInput> =
			[]
		for (const relation of this.product_categories.toRemoveRelations) {
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
		const galleryDisconnections: Prisma.Enumerable<Prisma.MediaWhereUniqueInput> =
			[]
		for (const relation of this.gallery.toRemoveRelations) {
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
						disconnect: product_categoriesDisconnections,
					},
					gallery: {
						connect: galleryConnections,
						disconnect: galleryDisconnections,
					},
				},
			})
		}

		this._saving = false
		this._isSaved = true
		return new Promise<number>((resolve) => resolve(this._id))
	}

	checkRequiredFields() {
		if (this.basketProducts.length > 0 && this.primaryKey === -1) {
			throw new Error(
				"Can't save toMany fields on new _Product. Save it first, then add the toMany fields",
			)
		}
		if (this.subOrders.length > 0 && this.primaryKey === -1) {
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
