export const views = {
  "/home": {"allowedGroups" : ["BUYER_USER", "BUYER_SUPER_USER"]},
  "/home2": {"allowedGroups" : ["SELLER_USER", "SELLER_SUPER_USER"]},
  "/home3": {"allowedGroups" : ["BUYER_USER", "BUYER_SUPER_USER"]},
  "/createuser": {"allowedGroups" : ["SELLER_SUPER_USER", "SELLER_USER", "BUYER_SUPER_USER"]},
}
export const forms = {
  "SuperBuyer": {"allowedGroups" : ["BUYER_USER", "BUYER_SUPER_USER"]},
  "SuperSeller": {"allowedGroups" : ["SELLER_USER", "SELLER_SUPER_USER"]},
}
