export const placeOrder = async (
  tenantId: string,
  orderItems: { id: number; quantity: number }[]
) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_URL;

  const orderPayload = {
    items: orderItems.map((item) => item.id),
  };

  try {
    const response = await fetch(`${baseUrl}/${tenantId}/orders`, {
      method: "POST",
      headers: {
        "x-zocom": apiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderPayload),
    });

    console.log("Response status:", response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(`Error placing order: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};
