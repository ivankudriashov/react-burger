export const getOrderTimeCreation = (dateString: string): string => {
    const orderDateTime = new Date(dateString);
    
    const orderDate = new Date(dateString);
    const orderDateMidnight = orderDate.setHours(0, 0, 0, 0);
    const nowDate = new Date();
    const nowDateMidnight = nowDate.setHours(0, 0, 0, 0);
  
    const dayMs = 86400000 // = 1000мс * 60сек * 60мин * 24ч
  
    const differenceInDays = (orderDateMidnight - nowDateMidnight) / dayMs;
    let actualCompletionTime;
    if (differenceInDays < -3) {
      actualCompletionTime = orderDate.toLocaleDateString('ru-RU');
    } else {
      actualCompletionTime = new Intl.RelativeTimeFormat('ru', {numeric: "auto"})
        .format(differenceInDays, 'day');
    }
    const actualDateInformationStr = `${actualCompletionTime}, ${orderDateTime.getHours() >= 10
      ? orderDateTime.getHours()
      : "0" + orderDateTime.getHours()}:${orderDateTime.getMinutes() >= 10
      ? orderDateTime.getMinutes()
      : "0" + orderDateTime.getMinutes()} i-GMT${orderDateTime.getTimezoneOffset() <= 0
      ? "+" + orderDateTime.getTimezoneOffset() / -60
      : "-" + orderDateTime.getTimezoneOffset() / -60}`;
    return actualDateInformationStr.charAt(0).toUpperCase() + actualDateInformationStr.slice(1);
  }