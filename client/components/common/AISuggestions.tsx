/**
 * Component to display AI suggestions for the input value.
 * @author  Isha CHopde
 */
import * as React from 'react'
import "../../resources/styles/components/common/AISuggestions.scss";
const Suggestions = ({userId, results, onSuggestionClick}) => {
    
  const options = results.map((suggestion, index) => (
    <li key={index} onClick={(ev) => onSuggestionClick(userId, suggestion[`suggestion ${index}`], userId)}>
      {suggestion[`suggestion ${index}`]}
    </li>
  ))
  return <ul className="suggestions">{options}</ul>
}

export default Suggestions