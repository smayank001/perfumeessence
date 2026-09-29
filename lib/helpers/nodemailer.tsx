// nodemailer order email template function
export const getOrderConfirmationEmail = (order: any) => {
  const { userDetails, shippingAddress, paymentMethod, items, totalPrice, notes, orderId } = order;

  const itemsHtml = items.map((item: any) => `
    <tr style="border-bottom:1px solid #ddd;">
      <td style="padding:8px;">
        <img src="${item.image}" width="50" height="50" style="object-fit:cover; border-radius:5px;" />
      </td>
      <td style="padding:8px;">${item.name}${item.variant !== "default" ? ` - ${item.variant}` : ''}</td>
      <td style="padding:8px;">${item.quantity}</td>
      <td style="padding:8px;">${item.onSale ? item.salePrice! * item.quantity : item.price * item.quantity} PKR</td>
    </tr>
  `).join("");


  return `
  <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; margin:0 auto; padding:20px; background-color:#f9f9f9;">
    <h2 style="color:#222;">Thank you for your order!</h2>
    <p>Hi <strong>${userDetails.fullName}</strong>,</p>
    <p>We’ve received your order <strong>#${orderId.slice(0,7).toUpperCase()}</strong> and it is being processed.</p>

    <h3 style="margin-top:20px; border-bottom:1px solid #ddd; padding-bottom:5px;">Order Details</h3>
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <th style="text-align:left; padding:8px;">Item</th>
          <th style="text-align:left; padding:8px;">Name</th>
          <th style="text-align:left; padding:8px;">Qty</th>
          <th style="text-align:left; padding:8px;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="margin-top:20px;">
      <p><strong>Subtotal:</strong> ${totalPrice - 300} PKR</p>
      <p><strong>Shipping:</strong> 300 PKR</p>
      <p style="font-size:18px;"><strong>Total:</strong> ${totalPrice} PKR</p>
    </div>

    <h3 style="margin-top:20px; border-bottom:1px solid #ddd; padding-bottom:5px;">Shipping Address</h3>
    <p>
      ${shippingAddress.address}, ${shippingAddress.city}<br />
      Postal Code: ${shippingAddress.postalCode || "N/A"}<br />
      Phone: ${userDetails.phone}<br />
      Email: ${userDetails.email || "N/A"}
    </p>

    <h3 style="margin-top:20px; border-bottom:1px solid #ddd; padding-bottom:5px;">Payment Method</h3>
    <p>${paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>

    ${notes ? `<h3 style="margin-top:20px;">Notes:</h3><p>${notes}</p>` : ''}

    <p style="margin-top:30px;">If you have any questions, feel free to reply to this email. Thank you for shopping with us!</p>
    <p style="margin-top:20px; color:#777; font-size:12px;">The Perfume Essence | Customer Service</p>
  </div>
  `;
};


export const getAdminNewOrderEmail = (order: any) => {
  const {
    userDetails,
    shippingAddress,
    paymentMethod,
    items,
    totalPrice,
    orderId,
    notes,
    createdAt
  } = order;

  const itemsHtml = items.map((item: any) => `
    <tr style="border-bottom:1px solid #eee;">
      <td style="padding:10px;">
        <img src="${item.image}" width="50" height="50" style="border-radius:6px; object-fit:cover;" />
      </td>
      <td style="padding:10px;">
        <strong>${item.name}</strong><br/>
        <span style="color:#777; font-size:12px;">
          ${item.variant !== "default" ? item.variant : ""}
        </span>
      </td>
      <td style="padding:10px;">${item.quantity}</td>
      <td style="padding:10px;">
        ${(item.onSale ? item.salePrice : item.price) * item.quantity} PKR
      </td>
    </tr>
  `).join("");

  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">

    <div style="max-width:650px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden;">

      <!-- Header -->
      <div style="background:#111; color:#fff; padding:20px;">
        <h2 style="margin:0;">🛒 New Order Received</h2>
        <p style="margin:5px 0 0; font-size:13px;">
          Order ID: #${orderId.slice(0,7).toUpperCase()}
        </p>
      </div>

      <!-- Customer Info -->
      <div style="padding:20px;">
        <h3 style="margin-bottom:10px;">👤 Customer Details</h3>
        <p style="margin:0;"><strong>Name:</strong> ${userDetails.fullName}</p>
        <p style="margin:0;"><strong>Phone:</strong> ${userDetails.phone}</p>
        <p style="margin:0;"><strong>Email:</strong> ${userDetails.email || "N/A"}</p>
      </div>

      <!-- Shipping -->
      <div style="padding:20px; border-top:1px solid #eee;">
        <h3 style="margin-bottom:10px;">📦 Shipping Address</h3>
        <p style="margin:0;">
          ${shippingAddress.address}, ${shippingAddress.city}<br/>
          Postal Code: ${shippingAddress.postalCode || "N/A"}
        </p>
      </div>

      <!-- Items -->
      <div style="padding:20px; border-top:1px solid #eee;">
        <h3 style="margin-bottom:10px;">🧾 Order Items</h3>
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#fafafa;">
              <th style="text-align:left; padding:10px;">Item</th>
              <th style="text-align:left; padding:10px;">Name</th>
              <th style="text-align:left; padding:10px;">Qty</th>
              <th style="text-align:left; padding:10px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
      </div>

      <!-- Pricing -->
      <div style="padding:20px; border-top:1px solid #eee;">
        <h3>💰 Payment Summary</h3>
        <p><strong>Subtotal:</strong> ${totalPrice - 300} PKR</p>
        <p><strong>Shipping:</strong> 300 PKR</p>
        <p style="font-size:18px;"><strong>Total:</strong> ${totalPrice} PKR</p>
        <p><strong>Method:</strong> ${paymentMethod === "cod" ? "Cash on Delivery" : "Bank Transfer"}</p>
      </div>

      ${notes ? `
        <div style="padding:20px; border-top:1px solid #eee;">
          <h3>📝 Notes</h3>
          <p>${notes}</p>
        </div>
      ` : ""}

      <!-- CTA -->
      <div style="padding:20px; text-align:center; border-top:1px solid #eee;">
        <a href="https://www.zevoraofficial.com/admin-dashboard/orders/${orderId}"
           style="display:inline-block; background:#111; color:#fff; padding:12px 20px; border-radius:6px; text-decoration:none;">
           View Full Order →
        </a>
      </div>

    </div>

    <!-- Footer -->
    <p style="text-align:center; color:#888; font-size:12px; margin-top:20px;">
      The Perfume Essence Admin Notification • This is an automated email
    </p>

  </div>
  `;
};
