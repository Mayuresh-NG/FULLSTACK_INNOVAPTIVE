
function getNthfib(n)
{
    if(n<=1)
    {
        return n;
    }
    return getNthfib(n-1)+getNthfib(n-2);   
}

var n = "fdds";

if (typeof n === 'string') {
    console.log("It's a string please enter a integer");
}

if(typeof n === Number)
{
    console.log(getNthfib(n));
}


