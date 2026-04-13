export const ROLES = Object.freeze({
SUPER_ADMIN: 'super_admin',
ADMIN: 'admin',
STAFF: 'staff',
USER: 'user',
})

export const ARTICLE_STATUS = Object.freeze({
    DRAFT:'draft',
    UNDER_REVIEW: 'under_review',
    PUBLISHED: 'published',
ARCHIVED: 'archived'})


export const ROLE_VALUES        = Object.values(ROLES)
export const STATUS_VALUES      = Object.values(ARTICLE_STATUS)