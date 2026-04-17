use crate::types::Arithmetic;

pub struct StandardArithmetic;

impl Arithmetic<i32> for StandardArithmetic {
    fn is_divisible(&self, n: i32, divisor: i32) -> bool {
        n % divisor == 0
    }
    fn to_string(&self, n: i32) -> String {
        n.to_string()
    }
}
