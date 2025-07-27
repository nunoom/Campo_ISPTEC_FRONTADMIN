// AnimatedTableRows.jsx
import { motion } from "framer-motion";

const AnimatedTableRows = ({ rows }) => {
  return (
    <>
      {rows.map((row, index) => (
        <motion.tr
          key={row.key || index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          {row.cells.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell}</td>
          ))}
        </motion.tr>
      ))}
    </>
  );
};

export default AnimatedTableRows;
