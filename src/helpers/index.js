export const formatDate = date => new Date(date).toLocaleString("en-US")

export const formatCurrency = amount => amount.toLocaleString("en-US", { style: "currency", currency: "USD" })