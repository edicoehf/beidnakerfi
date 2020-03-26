export const views = {
  '/createuser': { allowedGroups: ['SELLER_SUPER_USER', 'BUYER_SUPER_USER'] },
  '/home': { allowedGroups: ['SELLER_SUPER_USER', 'BUYER_SUPER_USER'] },
  '/createcheque': { allowedGroups: ['SELLER_SUPER_USER', 'SELLER_USER', 'BUYER_SUPER_USER'] },
  '/viewcustomers': { allowedGroups: ['SELLER_SUPER_USER', 'BUYER_SUPER_USER'] },
  '/viewusers': { allowedGroups: ['SELLER_SUPER_USER', 'BUYER_SUPER_USER'] },
};
export const forms = {
  SuperBuyer: { allowedGroups: ['BUYER_USER', 'BUYER_SUPER_USER'] },
  SuperSeller: { allowedGroups: ['SELLER_USER', 'SELLER_SUPER_USER'] },
};

export const sidebarButtons = {
  Basic: {
    allowedGroups: ['BUYER_USER'],
    buttons: [{ name: 'Ný beiðni', path: '/createcheque', pressed: true }],
  },
  SuperBuyer: {
    allowedGroups: ['BUYER_SUPER_USER'],
    buttons: [
      { name: 'Ný beiðni', path: '/createcheque', pressed: false },
      { name: 'Skrá starfsmann', path: '/createuser', pressed: false },
      { name: 'Yfirlit beiðna', path: '/home', pressed: true },
      { name: 'Starfsmannalisti', path: '/viewusers', pressed: false },
      { name: 'Viðskiptamannalisti', path: '/viewcustomers', pressed: false },

    ],
  },
  SuperSeller: {
    allowedGroups: ['SELLER_SUPER_USER'],
    buttons: [
      { name: 'Ný beiðni', path: '/createcheque', pressed: false },
      { name: 'Skrá starfsmann', path: '/createuser', pressed: false },
      { name: 'Yfirlit beiðna', path: '/home', pressed: true },
      { name: 'Starfsmannalisti', path: '/viewusers', pressed: false },
      { name: 'Viðskiptamannalisti', path: '/viewcustomers', pressed: false },

    ],
  },
};
