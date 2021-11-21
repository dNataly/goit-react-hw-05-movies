export default function ButtonBack(props) {
  return (
    <button type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}
