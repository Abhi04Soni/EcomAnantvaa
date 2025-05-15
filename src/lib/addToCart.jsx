import { supabase } from '../utils/supabase'

export async function addToCart(productId, quantity = 1,size = 'M') {
  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    alert('Please log in to add items to your cart.')
    return
  }

  // Check if item already in cart for this user + product
  const { data: existingItems, error: fetchError } = await supabase
    .from('cart')
    .select('*')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .limit(1)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') { // Ignore "no rows found" error
    console.error(fetchError)
    alert('Error checking cart')
    return
  }

  if (existingItems) {
    // Update quantity if already exists
    const newQuantity = existingItems.quantity + quantity
    const { error: updateError } = await supabase
      .from('cart')
      .update({ quantity: newQuantity })
      .eq('productId', existingItems.productId)

    if (updateError) {
      alert('Failed to update cart')
      return
    }
  } else {
    // Insert new row
    const { error: insertError } = await supabase.from('cart').insert([
      {
        userId: user.id,
        productId: productId,
        Quantity: quantity,
        Size: size,
      },
    ])

    if (insertError) {
      alert('Failed to add to cart')
      return
    }
  }

  alert('Added to cart!')
}
