var btnsl =document.querySelector("#btnsolv");
var chk=document.querySelector("#vld");
var rsto=document.querySelector("#rst");
btnsl.addEventListener("click",function(){
    var sqarr = document.querySelector("table");
     sqrclls =sqarr.querySelectorAll("input");
     var en=[];
    for (let i = 0; i < sqrclls.length; i++) {
        if(sqrclls[i].value==="" || sqrclls[i].value==" ")
        {
            sqrclls[i].value=" ";
            en.push(1);
        }
        else
        {
            sqrclls[i].style.backgroundColor="#D3D3D3";
            sqrclls[i].readOnly=true;
            en.push(0);
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
    console.log(tble);
    var chck=isvalid(tble);
    var pval=document.querySelector('#bvalidity');
    if(chck!=true)
    {
        pval.textContent="Invalid Input";
    }
    else
    {
        solvsudoku(tble,0,0);
    }
    for(var sz=0;sz<81;sz++)
{
    if(en[sz])
    sqrclls[sz].value=" ";}
var x=0;
var y=0;
var itvl=setInterval(function(){
    sqrclls[x*9+y].value=tble[x][y];
    if(en[x*9+y])
    {
        sqrclls[x*9+y].style.color="#A52A2A";
    }
    y++;
    if(y==9)
    {
        x++;
        y=0;
        if(x==9)
        clearInterval(itvl);
    }
},100);
})
function isvalid(tble)
{
    for (let i= 0;i<9;i++)
    {
        for(let j=0;j<9;j++)
        {
            let v1=tble[i][j];
            if(v1!==" " && v1!="")
            {
                if(v1>9 || v1<=0)
                {
                    return false;
                }
                for(let k=0;k<9;k++)
                {
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
    if(tble[rw][cl]==" ")
    {
        for(let wv=1;wv<10;wv++)
        {
            tble[rw][cl]=(wv);
            if(isvalid(tble))
            {
                if(solvsudoku(tble,rw,cl+1))
                return true;
            }
            tble[rw][cl]=" ";
        }
    }
    else
    {
        return solvsudoku(tble,rw,cl+1);
    }
}
}
chk.addEventListener("click",function(){
    var sqarr = document.querySelector("table");
     sqrclls =sqarr.querySelectorAll("input");
     var tble1=[];
     var ttble1 = [];
     for (let i = 0; i < sqrclls.length; i++) {
        if(sqrclls[i].value==="")
        {
            sqrclls[i].value=" ";  
        }
    }
    for(let j=0;j<sqrclls.length;j++)
    { 
        if(j%9==0 && j!=0)
        {
            tble1.push(ttble1);
            ttble1=[];
            ttble1.push(sqrclls[j].value);
        }
        else
        ttble1.push(sqrclls[j].value);
    }
    tble1.push(ttble1);
    var pval=document.querySelector("#bvalidity");
    if(isvalid(tble1))
    {
        pval.textContent="It is valid Sudoku";
    }
    else
    {
        pval.textContent="It is not valid Sudoku";
    }
})
rsto.addEventListener("click",function(){
    var pval=document.querySelector("#bvalidity");
    pval.textContent="";
    var sqarr = document.querySelector("table");
     sqrclls =sqarr.querySelectorAll("input");
     for (let i = 0; i < sqrclls.length; i++)
     {
        sqrclls[i].style.backgroundColor="#FFFFFF";
     }
})