function sufflearr()
{
    var numar=[1,2,3,4,5,6,7,8,9];
    for (let i = 0; i < numar.length; i++) {
        let idx=Math.floor(Math.random()*(i+1));
        let tmp=numar[i];
        numar[i]=numar[idx];
        numar[idx]=tmp;
    }
    return numar;
}
var sqarr = document.querySelector("table");
function isvalid(tble)
{
    for (let i= 0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            let v1=tble[i][j];
            if(v1!=="0")
            {
                if(v1>9 || v1<=0)
                {
                    return false;
                }
                for(let k=0;k<9;k++)
                {
                    if(typeof(tble[i][k])==="undefined")
                    {
                        console.log(i,k);
                    }
                    if(v1==tble[i][k] && k!==j)
                    {
                        return false;
                    }
                    if(v1==tble[k][j] && k!==i)
                    {
                        return false;
                    }
                }
                let aw=i;
                let bw=j;
                let r1=3*parseInt(aw/3);
                let c1=3*parseInt(bw/3);
                for(let t1=r1;t1<r1+3;t1++)
                {
                    for(let t2=c1;t2<c1+3;t2++)
                    {
                        if(v1==tble[t1][t2] && !(t1==i && t2==j))
                        {
                            return false;
                        }
                    }
                }
            }  
        }  
    }
    return true;
}
function solvsudoku(tble,rw,cl)
{
    if(cl==9)
    {
        if(rw<8)
        {
            cl=0;
            rw++;
            return solvsudoku(tble,rw,cl);
        }
        else if(rw==8)
        {
            return true;
        }
    }
    else
        {
            if(tble[rw][cl]==="0")
        {
        for(let wv=1;wv<10;wv++)
        {
            tble[rw][cl]=(wv);
            if(isvalid(tble))
            {
                if(solvsudoku(tble,rw,cl+1))
                return true;
            }
        }
        tble[rw][cl]="0";
        // sqrclls[rw*9+cl].value="0";
        return false;
        }
        else
        {
            return solvsudoku(tble,rw,cl+1);
        }
    }
}
function helper(tble)
{
    var idx2;
    while(true)
    {
        idx2=Math.floor(Math.random()*81);
        if(tble[Math.floor(idx2/9)][idx2%9]!=" ")
        {     
            break;
        }
    }
    tble[Math.floor(idx2/9)][idx2%9]=" ";
    sqrclls[idx2].value=" ";
}
var gennew=document.querySelector("#btngen");
gennew.addEventListener("click",function(){
    sqrclls =sqarr.querySelectorAll("input");
    for(var sz=0;sz<81;sz++)
    sqrclls[sz].value="";
for(let i=0;i<3;i++)
{
    let tarr=sufflearr();
    for (let j = 0; j < tarr.length; j++) 
    {
        sqrclls[3*i*9+3*i+9*Math.floor(j/3)+(j%3)].value=tarr[j];
    }
}
for(let k=0;k<sqrclls.length;k++)
{
    if(sqrclls[k].value==="")
    {
        sqrclls[k].value='0';
    }
}
var tble = [];
    var ttble = [];
    for(let j=0;j<sqrclls.length;j++)
    { 
        if(j%9==0 && j!=0)
        {
            tble.push(ttble);
            ttble=[];
            ttble.push(sqrclls[j].value);
        }
        else
        ttble.push(sqrclls[j].value);
    }
    tble.push(ttble);
    for(var sz=0;sz<81;sz++)
    sqrclls[sz].value="";
    solvsudoku(tble,0,0);
    for(var z=0;z<30;z++)
    {
        helper(tble);
    }
    var x=0;
    var y=0;
    var itvl=setInterval(function(){
    sqrclls[x*9+y].value=tble[x][y];
    y++;
    if(y==9)
    {
        x++;
        y=0;
        if(x==9)
        clearInterval(itvl);
    }
    console.log(x,y);
},100);
})


