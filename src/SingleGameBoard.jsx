import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";

function SingleGameBoard({player, lastChar = 'a', allWords, setToAllWords, setLastChar, score, setScore , otherPlayerAllWords, turn, setTurn}) {
    const [word, setWord] = useState("");
    const inputRef = useRef();

    async function wordValidator(word){
        const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return data?.status === 200;
    }

    function turnHandler(active){
        if(active === 1) {
            setScore(pre=>pre-1);
            setTurn(2);
        }
        else if (active === 2) {
            setScore(pre=>pre-1);
            setTurn(1);
        }

        setWord("");
    }

    useEffect(()=>{
        if(turn === player){
            inputRef?.current?.focus();
        }
    },[turn])

    const submitHandler = async (e) => {
        if(e.key === 'Enter'){
            const isTheWordValid = await wordValidator(word);
            if(word.length > 3 && word[0].toLocaleLowerCase() == lastChar && isTheWordValid && !allWords[word] && !otherPlayerAllWords[word]){
                console.log(word);
                const newData = {...allWords};
                newData[word] = true;
                setToAllWords(newData);
                setLastChar(word[word.length - 1].toLocaleLowerCase());
                setScore(pre=>pre+word.length);
                if(player === 1) {
                    setTurn(2);
                }else if(player === 2){
                    setTurn(1);
                }
            } else{
                if(word.length <= 3){
                    alert("Word should be more that 3 char");
                    return;
                    
                } else if(!isTheWordValid){
                    alert("Invalid word. You got -1 penalty.");
                    setScore(pre=>pre-1);
                }else if(allWords[word] || otherPlayerAllWords[word]){
                    alert(`Word repeat will not be allowed.`);
                } else if(word[0].toLocaleLowerCase() !== lastChar){
                    alert(`Word should be start with ${lastChar}. You got -1 penalty.`);
                    setScore(pre=>pre-1);
                }
            }

            setWord("");
        }
    }

    return (
      <>
        <div className="w-80  h-fit pb-20 bg-red-900 rounded-lg">
            <div className="flex justify-center text-yellow-300 py-2">
                {turn === player && 
                 <span className="flex gap-1">
                    <span>Time left:</span>
                    <span className="text-white font-bold"> <Timer turnHandler={()=>turnHandler(turn)} seconds={15}/></span>
                     <span>seconds</span>
                </span>
                }
            </div>
            <div className="text-center p-3 text-lg font-semibold text-white">
               Player: {player} || Score: {score}
            </div>
            <div className="flex flex-col items-center justify-center w-full">
                <input 
                    placeholder={lastChar} 
                    className="p-2" 
                    value={word} 
                    onKeyDown={submitHandler} 
                    onChange={(e)=>setWord(e.target.value.toLocaleLowerCase().trim())}
                    disabled={turn !== player}
                    ref={inputRef}
                />
                <div className="w-full px-16 flex flex-col gap-4 mt-4">
                    {
                        allWords && Object.keys(allWords).reverse().map((item,index)=>{
                            return (
                                <div key={index} className="py-1 text-center bg-white rounded-md w-full">
                                    {item}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default SingleGameBoard;
  