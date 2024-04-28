import sorryImg from "../sorry.jpg";
function NotFoundPage() {
  return (
    <>
      <h1>Page not found!</h1>
      <img
        className="sorry-img"
        src={sorryImg}
        alt="people holding a sorry sign"
      />
    </>
  );
}

export default NotFoundPage;
