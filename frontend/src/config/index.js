export const views = {
  "/createuser": {"allowedGroups" : ["SELLER_SUPER_USER", "SELLER_USER", "BUYER_SUPER_USER"]},
  "/main": {"allowedGroups" : ["SELLER_SUPER_USER", "SELLER_USER", "BUYER_SUPER_USER"]},
}
export const forms = {
  "SuperBuyer": {"allowedGroups" : ["BUYER_USER", "BUYER_SUPER_USER"]},
  "SuperSeller": {"allowedGroups" : ["SELLER_USER", "SELLER_SUPER_USER"]},
}
