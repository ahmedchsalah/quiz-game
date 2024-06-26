import React, {useRef, useState} from 'react'
import './Quiz.css';
import {data} from '../Assets/data'
import employees_db_v2 from '../Pictures/employees_db_v2.png';
import customers_small_v2 from '../Pictures/customers_small_v2.png';
import customers_small_v3 from '../Pictures/customers_small_v3.png';
import employees_small_v2 from '../Pictures/employees_small_v2.png';

const Quiz = () => {
    let [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [lock, setLock] = useState(false)
    const [score, setScore] = useState(0)
    const [result, setResult] = useState(false);
    const Option1 = useRef(null)
    const Option2 = useRef(null)
    const Option3 = useRef(null)
    const Option4 = useRef(null)

    const option_array = [Option1, Option2, Option3, Option4]

    const checkAns = (e, ans) => {
        if(lock===false){
            if(question.ans===ans){
                e.target.classList.add('correct');
                setLock(true)
                setScore(prev => prev+1)
            }else{
                e.target.classList.add('wrong');
                setLock(true)
                option_array[question.ans-1].current.classList.add('correct')
            }
        }
    }
    const next = () => {

        if(lock===true){
            if(index===data.length-1){
                setResult(true)
                return 0;
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            option_array.map((option) => {
                option.current.classList.remove('wrong');
                option.current.classList.remove('correct');
                return null;
            })
        }
    }
    const reset = () => {
        setIndex(0);
        setQuestion(data[0])
        setScore(0)
        setLock(false)
        setResult(false)
        return 0 ;
    }
    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {result?<></>:<>
            <h2>{index+1}. {question.question}</h2>
                {index+1===2 && <img src={employees_db_v2} alt='employees db'/>}
                {index+1===3 && <img src={customers_small_v3} alt='customers table 1'/>}
                {index+1===3 && <img src={customers_small_v2} alt='customers table 2'/>}
                {index+1===4 && <img src={employees_small_v2} alt='employees table'/>}
            <ul>
                <li ref={Option1} onClick={(e) => {checkAns(e,1)}}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => {checkAns(e,2)}}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => {checkAns(e,3)}}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => {checkAns(e,4)}}>{question.option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className='index'>{index+1} of {data.length} questions</div> </>}
            {result? <><h2>You scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button></>:<></>
            }
            </div>
                )
            }
            export default Quiz
