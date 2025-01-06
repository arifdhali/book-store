export const formattedDateTime = (passDate) => {
    let d = new Date(`${passDate}`);
    let year = d.getFullYear()
    let month = String(d.getMonth() + 1).padStart(2, "0");
    let date = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${date} 23:59:59`
}