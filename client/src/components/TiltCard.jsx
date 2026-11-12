/** Card component without round spotlight or tilt animation. */
const TiltCard = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default TiltCard;
