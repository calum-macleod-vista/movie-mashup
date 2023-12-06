import { Action } from './store'
import { Clue }  from '../features/clues/clue-manager/clue-manager.service'



export function createGetAllCluesAction(clues: Clue[]): Action {
    return {
        type: 'SET_CLUES_FOR_SESSION',
        payload: clues
    }
}
