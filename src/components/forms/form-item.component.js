/** @format */
import "bootstrap/dist/css/bootstrap.min.css";

function FormItem(props) {
  return (
    <tbody>
      {props.forms.map((form, index) => {
        return (
          <tr key={form.id}>
            <td key={index}>{form.id}</td>
            <td key={index + 1}>{form.title}</td>
            <td key={index + 2}>{form.subtitle}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default FormItem;
