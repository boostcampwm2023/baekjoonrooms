export function getProblemButtonColor(level:number | undefined):string{
    if(level === undefined){
        return "text_default";
    }
    if(level <= 5){
        return "level_bronze";
    }
    if(level <= 10){
        return "level_silver";
    }
    if(level <= 15){
        return "level_gold";
    }
    if(level <= 20){
        return "level_platinum";
    }
    if(level <= 25){
        return "level_diamond";
    }   
    if(level <= 30){
        return "level_ruby";
    }
    return "text_default";
}