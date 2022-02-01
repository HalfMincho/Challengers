import './style.scss';

export default function Paragraph({ children }) {
  return (
    <section className="Paragraph">
      <p className="title">{children[0]}</p>
      <div className="content">{children[1]}</div>
    </section>
  );
}
