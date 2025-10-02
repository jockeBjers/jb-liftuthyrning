import type Lift from "../interfaces/Lift";
import type User from "../interfaces/User";

interface Order {
    id: number;
    orderDate: string;
    returnDate: string;
    totalPrice: number;
}

interface OrderItem {
    id: number;
    orderId: number;
    liftId: number;
}

interface PrintOrderParams {
    orderId: number;
    order: Order;
    items: OrderItem[];
    lifts: Lift[];
    user: User | null;
    calculateRentalCost: (orderDate: string, returnDate: string, dailyPrice: number, startFee: number) => number;
    getLiftName: (liftId: number) => string;
}

export const printOrder = ({
    orderId,
    order,
    items,
    lifts,
    user,
    calculateRentalCost,
    getLiftName
}: PrintOrderParams): void => {
    const receiptHtml = `
<html>
  <head>
    <title>Kvitto för Order #${orderId}</title>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        margin: 20mm; 
        color: black; 
        line-height: 1.5;
      }
      h2 { 
        margin-bottom: 15px; 
      }
      p { 
        margin: 8px 0; 
      }
      table { 
        width: 100%; 
        border-collapse: collapse; 
        margin: 15px 0; 
      }
      th, td { 
        border: 1px solid black; 
        padding: 6px 8px; 
        text-align: left; 
      }
      thead { 
        background-color: #f2f2f2; 
      }
    </style>
  </head>
  <body>
    <h1>JB-Liftuthyrning</h1>
    <h2>Kvitto för Order #${orderId}</h2>

    <p><strong>Kundnamn:</strong> ${user?.firstName} ${user?.lastName}</p>
    <p><strong>Orderdatum:</strong> ${order.orderDate}</p>
    <p><strong>Returdatum:</strong> ${order.returnDate}</p>
    <p>
      <strong>Antal dagar:</strong>
      ${Math.ceil((new Date(order.returnDate).getTime() - new Date(order.orderDate).getTime()) / (1000 * 3600 * 24)) + 1}
    </p>

    <table>
      <thead>
        <tr>
          <th>Produkt</th>
          <th>Pris per dag</th>
          <th>Startavgift</th>
          <th>Totalpris</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(item => {
        const lift = lifts.find(l => l.id === item.liftId);
        const totalLiftPrice = lift
            ? calculateRentalCost(order.orderDate, order.returnDate, lift.dailyPrice, lift.startFee)
            : 0;
        return `<tr>
                    <td>${getLiftName(item.liftId)}</td>
                    <td>${lift?.dailyPrice ?? 0} kr</td>
                    <td>${lift?.startFee ?? 0} kr</td>
                    <td>${totalLiftPrice} kr</td>
                  </tr>`;
    }).join("")}
      </tbody>
    </table>

    <p><strong>Totalt:</strong> ${order.totalPrice} kr</p>
  </body>
</html>
`;

    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.srcdoc = receiptHtml;
    document.body.appendChild(iframe);

    iframe.onload = () => {
        const win = iframe.contentWindow;
        if (win) {
            win.focus();
            win.print();
            win.onafterprint = () => document.body.removeChild(iframe);
        }
    }
};