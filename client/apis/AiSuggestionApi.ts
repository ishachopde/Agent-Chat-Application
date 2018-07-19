/**
 * AI suggestions APIs.
 * @author  Isha CHopde
 */

import axios from 'axios';
export function getSuggestions (text) {
    return axios.get(`https://dev.cresta.ai/api/front_end_challenge`)
}