export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || process.env.API_BASE;

export const API_URLS = {
  base_url: API_BASE,
  customers: `${API_BASE}/api/customers`,
};
